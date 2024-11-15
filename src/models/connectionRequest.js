const mongoose = require("mongoose");
const User = require("./user.js")
const connectionRequestSchema = new mongoose.Schema({
        toUserId:{
               type: mongoose.Schema.Types.ObjectId,
               ref:"User",
               require:true
        },
        fromUserId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                require:true

        },
        status:{
                type:String,
                require:true,
                enum:{
                        values:["ignored","interested","accepted","rejected"],
                        message:`{VALUE} in incorrect status type `,
                }
        },
},{
        timestamps:true
});

connectionRequestSchema.index({toUserId:1,fromUserId:1});
connectionRequestSchema.pre("save",function(next)
{
        if(this.fromUserId.equals(this.toUserId))
        {
                throw new Error("Can not send requiest Yourself");
        }
        next();
})

module.exports = mongoose.model("ConnectionRequest",connectionRequestSchema);