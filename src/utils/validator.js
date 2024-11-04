const  validator = require("validator");

const validateSingup = (req)=>
{ 
    const {firstName,lastName, emailId , passwaord} = req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
   else if(!validator.isEmail(emailId))
    {
        throw new Error("Invalid email address");
    }
    else if(!validator.isStrongPassword)
    {
        throw new Error("enter strong password");
    }
   

}

module.exports = {validateSingup}