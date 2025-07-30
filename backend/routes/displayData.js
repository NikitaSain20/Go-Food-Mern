const express = require("express");
const router = express.Router();

router.post("/display", (req, res) => {
  try {
    console.log(global.foodItem);
    res.send([global.foodItem, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
});

module.exports = router;
