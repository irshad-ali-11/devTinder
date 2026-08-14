const { Router } = require("express");
const { ConnectionRequest } = require("../models/connectionRequestModel.js");
const { userAuth } = require("../middlewares/userAuth.js");
const { User } = require("../models/user.js");
const requestRouter = Router();

requestRouter.post(
   "/request/send/:status/:toUserId",
   userAuth,
   async (req, res) => {
      try {
         const toUserId = req.params.toUserId;
         const status = req.params.status;
         const fromUserId = req.user._id;
         const toUserExist = await User.findById(toUserId);
         if (!toUserExist) {
            return res.status(404).json({
               message: "user not found",
            });
         }
         const allowStatus = ["interested", "ignored"];
         if (!allowStatus.includes(status)) {
            return res.status(400).json({
               message: `Invalid ${status} status type`,
            });
         }
         const existingConnection = await ConnectionRequest.findOne({
            $or: [
               {
                  fromUserId,
                  toUserId,
               },
               {
                  fromUserId: toUserId,
                  toUserId: fromUserId,
               },
            ],
         });
         if (existingConnection) {
            return res.status(400).json({
               message: "Connection Request are already exist",
            });
         }
         const connection = await ConnectionRequest.create({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status,
         });

         res.status(200).json({
            message: `${req.user.firstName} is a ${status} in ${toUserExist.firstName} !`,
            data: connection,
         });
      } catch (error) {
         console.log("error " + error);
         res.status(400).json({
            Error: error.message,
         });
      }
   },
);
requestRouter.post(
   "/request/review/:status/:requestId",
   userAuth,
   async (req, res) => {
      try {
         const loggedInUser = req?.user;
         const { status, requestId } = req?.params;
         const allowedStatus = ["accepted", "rejected"];
         if (!allowedStatus?.includes(status)) {
            return res.status(404).json({
               message: `${status} Invalid status type`,
            });
         }

         const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
         });
         if (!connectionRequest) {
            return res.status(404).json({
               message: "Connection are not found",
            });
         }
         const connection = await ConnectionRequest.findByIdAndUpdate(
            requestId,
            { status: status },
            { new: true },
         );

         res.status(200).json({
            message: `${loggedInUser.firstName} is ${status} connection request`,
            data: connection,
         });
      } catch (error) {
         console.log(error);
         res.status(400).json({
            ERROR: error.message,
         });
      }
   },
);
module.exports = { requestRouter };
