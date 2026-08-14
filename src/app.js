const express = require("express");
const { connectDb } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const app = express();
const { authRouter } = require("./routers/auth.js");
const { profileRouter } = require("./routers/profile.js");
const { requestRouter } = require("./routers/request.js");
const { userRouter } = require("./routers/user");
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

// const mongoose = require("mongoose");
// const User = require("./user.js");
// const connectionRequestSchema = new mongoose.Schema(
//    {
//       toUserId: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User",
//          require: true,
//       },
//       fromUserId: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "User",
//          require: true,
//       },
//       status: {
//          type: String,
//          require: true,
//          enum: {
//             values: ["ignored", "interested", "accepted", "rejected"],
//             message: `{VALUE} in incorrect status type `,
//          },
//       },
//    },
//    {
//       timestamps: true,
//    },
// );

// connectionRequestSchema.index({ toUserId: 1, fromUserId: 1 });
// connectionRequestSchema.pre("save", function (next) {
//    if (this.fromUserId.equals(this.toUserId)) {
//       throw new Error("Can not send requiest Yourself");
//    }
//    next();
// });

// module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
