const mongoose  = require("mongoose");

const {Schema,model} = mongoose;

const userSchema = Schema({
        
                firstName :String,
                lastName:String,
                emailId : String,
                password :String,
                age:Number,
                gender:String
        
});

module.exports = model("User",userSchema);
 