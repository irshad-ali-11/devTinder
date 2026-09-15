const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
   try {
      const token = req.signedCookies.token;
      if (!token) {
         return res.status(401).json({
            message: "Invalid creaditials",
         });
      }
      const decode = jwt.verify(token, "Irshad");
      const user = await User.findById({ _id: decode._id });
      if (!user) {
         return res.status(404).json({
            message: "user not found",
         });
      }
      req.user = user;
      next();
   } catch (err) {
      res.status(400).json({ ERROR: err.message });
   }
};
module.exports = { userAuth };
