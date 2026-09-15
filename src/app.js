const express = require("express");
const { connectDb } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();
const { authRouter } = require("./routers/auth.js");
const { profileRouter } = require("./routers/profile.js");
const { requestRouter } = require("./routers/request.js");
const { userRouter } = require("./routers/user");
const cors = require("cors");
app.use(
   cors({
      origin: "http://localhost:5173/",
      credentials: true,
   }),
);
app.use(express.json());
app.use(cookieParser("Irshad"));
app.use("/api/v1/", authRouter);
app.use("/api/v1/", profileRouter);
app.use("/api/v1/", requestRouter);
app.use("/api/v1/", userRouter);
connectDb()
   .then(() => {
      app.listen(3000, () => {
         console.log("Server Start... 3000");
      });
   })
   .catch(() => {
      console.log("database can not connect ...");
   });
