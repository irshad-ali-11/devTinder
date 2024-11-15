const express = require("express");
const { connectDb } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();
const { authRouter } = require("./routers/auth.js");
const { profileRouter } = require("./routers/profile.js");
const { requestRouter } = require("./routers/request.js");
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
connectDb()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Start... 3000");
    });
  })
  .catch(() => {
    console.log("database can not connect ...");
  });
