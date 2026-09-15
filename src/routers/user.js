const { Router } = require("express");
const { userAuth } = require("../middlewares/userAuth");
const userRouter = Router();
const { ConnectionRequest } = require("../models/connectionRequestModel.js");
const { User } = require("../models/user.js");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
   try {
      const loggedInUser = req.user;
      const receivedRequest = await ConnectionRequest.find({
         toUserId: loggedInUser._id,
         status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);

      res.status(200).json({
         message: "connection request are received successfully!!!",
         data: receivedRequest,
      });
   } catch (error) {
      res.status(400).json({
         ERROR: error.message,
      });
   }
});
userRouter.get("/user/connection", userAuth, async (req, res) => {
   try {
      const loggedInUser = req?.user;
      const connections = await ConnectionRequest.find({
         $or: [
            {
               fromUserId: loggedInUser._id,
               status: "accepted",
            },
            {
               toUserId: loggedInUser._id,
               status: "accepted",
            },
         ],
      })
         .populate("fromUserId", USER_SAFE_DATA)
         .populate("toUserId", USER_SAFE_DATA);

      const data = connections.map((row) => {
         if (row.fromUserId.toString() === loggedInUser._id.toString()) {
            return row.fromUserId;
         }
         return row.toUserId;
      });
      console.log("connection BE - ");
      console.log(data);

      res.status(200).json({
         message: "fetch a connections successfully!!!",
         data,
      });
   } catch (error) {
      res.status(400).json({
         Error: error.message,
      });
   }
});
userRouter.get("/feed", userAuth, async (req, res) => {
   try {
      const loggedInUser = req?.user;
      let page = req?.query?.page;
      const limit = req?.query?.limit;

      const hideUser = await ConnectionRequest.find({
         $or: [
            {
               fromUserId: loggedInUser._id,
            },
            {
               toUserId: loggedInUser._id,
            },
         ],
      })
         .populate("fromUserId", USER_SAFE_DATA)
         .populate("toUserId", USER_SAFE_DATA);
      const HIDE_USER_FROM_FEED = new Set();
      hideUser.forEach((user) => {
         HIDE_USER_FROM_FEED.add(user?.fromUserId._id.toString());
         HIDE_USER_FROM_FEED.add(user?.toUserId._id.toString());
      });

      const feedUser = await User.find({
         $and: [
            {
               _id: {
                  $nin: Array.from(HIDE_USER_FROM_FEED),
               },
            },
            {
               _id: {
                  $ne: loggedInUser._id,
               },
            },
         ],
      })
         .select(USER_SAFE_DATA)
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit >= 10 ? 10 : limit);

      res.status(200).json({
         message: "fetching Feed are successfully!!!!.",
         data: feedUser,
      });
   } catch (error) {
      res.status(400).json({
         ERROR: error.message,
      });
   }
});

module.exports = { userRouter };
