const mongoose = require("mongoose");
const validator = require("validator");
const { Schema, model } = mongoose;

const userSchema = Schema({
  firstName: {
    type: String,
    required:true,
    minLength:4,
    maxLength:50,
    trim:true

  },
  lastName: {
    type: String,
    minLength:1,
    maxLength:50,
    trim:true,
  

  },
  emailId: {
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    validate(value)
    {
       if(!validator.isEmail(value))
        {
            throw new Error("InValid email address "  + value);
        };
    }

  },
  password: {
    type: String,
    required:true,
    validate(value)
    {
      if(!validator.isStrongPassword(value))
      {
          throw new Error("Enter Strong Password");
      }
    }

  },
  age: {
    type: Number,
  },
  about:{
    type:String,
    default:"This is Basic tinger about "
  },
  skills:
  {
     type:[String],
     validate(value){
      if(value.length > 10)
      {
          throw new Error("skills added only 10");
      }
     }
  },
  gender: {
    type: String,
    validate(value)
      {
        if(!["male","female","another"].includes(value))
        {
            throw new Error("Gender data is not valid");
        }
      }
           
    
  },
});

module.exports = model("User", userSchema);
