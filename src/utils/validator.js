const validator = require("validator");
const validateSingup = (req) => {
   const { firstName, lastName, emailId, password } = req.body;
   if (!firstName || !lastName) {
      throw new Error("Name is not valid");
   } else if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email address");
   } else if (!validator.isStrongPassword(password)) {
      throw new Error("enter strong password");
   }
};
const validateProfileEdit = (req) => {
   const AllowUpdated = [
      "firstName",
      "lastName",
      "gender",
      "skills",
      "about",
      "age",
      "photoUrl",
   ];
   const isALlow = Object.keys(req.body).every((k) => AllowUpdated.includes(k));
   if (!isALlow) {
    
      throw new Error("update are not allow ");
   }
};

module.exports = { validateSingup, validateProfileEdit };
