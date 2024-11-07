const User  = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
        const token = req.cookies.token;
	if(!token)
	{
		throw new Error("token not present");
	}
        const decode = jwt.verify(token,"Irshad");
        const user = await User.findById({_id:decode._id});
        if(!user)
        {
	    throw new Error("user not found");
        }
            req.user = user;
	    next();
       }
        catch (err) {
              res.status(400).send("ERROR" +  err.message );
          }
};
module.exports ={userAuth};