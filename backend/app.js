require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT;

const userRoute = require("./src/routes/users");
const attendanceRoute = require("./src/routes/attendances");
const authRoute = require("./src/routes/auth");

// ---------------------------------------------------
// Enabled CORS to be accessed from another site
app.use(cors());
// Parse incoming application/json request
app.use(express.json({
  limit: "20mb"
}));
// HTTP request logging middleware
app.use(morgan("combined"));

// ---------------------------------------------------
// Initial endpoint
app.get("/api/v1", function (_, res) {
  res.status(200).json({
    success: true,
    message: "Hello world!"
  });
});

// API routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/attendances", attendanceRoute);
app.use("/api/v1/auth", authRoute);

// ---------------------------------------------------
app.listen(PORT, () => {
  console.log(`This app is running in port ${PORT}`);
});