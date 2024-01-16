const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// To import routers
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");

// To connect to the Database
mongoose
  .connect(process.env.mongoDB)
  .then(() => {
    console.log("Successfully connected to the MongoDB!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// Middleware For Handling Error
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error!"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
}) 


app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});


