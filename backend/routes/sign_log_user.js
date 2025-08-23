const User = require("../models/user");
const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const signupValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("location").notEmpty().withMessage("Location is required"),
];

router.post("/signup", signupValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(8);
  let hashpass = await bcrypt.hash(req.body.password, salt);
  try {
    const created = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
      location: req.body.location,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ error: "Try logging with correct credentials" });
      }
      const comparepass = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!comparepass) {
        return res
          .status(400)
          .json({ error: "Try logging with correct credentials" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authtoken = JWT.sign(data, secretKey);
      const verifyauth = JWT.verify(authtoken, secretKey);

      res.json({ success: true, authtoken });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

module.exports = router;
