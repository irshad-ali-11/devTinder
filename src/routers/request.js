const {Router}= require("express");
const { userAuth } = require("../middlewares/userAuth");
const requestRouter = Router();
const User = require("../models/user.js")
const ConnectionRequest = require("../models/connectionRequestSchema.js")
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res)=>
{
        const {status,toUserId} = req.params;
        const fromUserId= req.user._id;
        try
        {
             const allowStatus = ["ignored","interested"];
              if(!allowStatus.includes(status))
              {
                throw new Error("status are not allow");
              }
            const toUser = await User.findById(toUserId);
            if(!toUser)
            {
                throw new Error("User are not exits");
            }
            const existingConnectionRequest = await ConnectionRequest.findOne({
               $or: [{fromUserId,toUserId},
                      {fromUserId:toUserId,toUserId:fromUserId}
                     ]
            });
            if(existingConnectionRequest)
            {
                throw new Error("Connection Request are already exists");
            }
             const connection = new ConnectionRequest({toUserId,fromUserId,status});
               await connection.save(); 
             res.json({message:`${req.user.firstName} is ${status} in ${toUser.firstName}`});
           }
           catch(error)
          {
             res.status(400).json({ERROR:error.message});
          }

      
});


module.exports={requestRouter};