require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const mongoDb = require("./db");
const userRouter = require("./routes/sign_log_user");
const displayRouter = require("./routes/displayData");
const orderRouter = require("./routes/orderData");
mongoDb();
const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "process.env.FRONTEND_URL");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api", userRouter);
app.use("/api", displayRouter);
app.use("/api", orderRouter);

app.listen(PORT, () => {
  console.log("server started successfully");
});
