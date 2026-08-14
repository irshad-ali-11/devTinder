const { Schema, model } = require("mongoose");

const connectionRequestSchema = new Schema(
   {
      fromUserId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      toUserId: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      status: {
         type: String,
         required: true,
         enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: `{VALUE} is not type of status`,
         },
      },
   },
   {
      timestamps: true,
   },
);

connectionRequestSchema.pre("save", function (next) {
   if (this.fromUserId.equals(this.toUserId)) {
      throw Error("You can not request Itself");
   }
   next();
});
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });
const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);
module.exports = { ConnectionRequest };
