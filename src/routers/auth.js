const express = require("express");
const validator = require("validator");
const authRouter = express.Router();
const { validateSingup } = require("../utils/validator");
const { User } = require("../models/user.js");
const bcrypt = require("bcrypt");

authRouter.post("/singup", async (req, res) => {
   try {
      validateSingup(req);
      const {
         firstName,
         lastName,
         emailId,
         password,
         photoUrl = "",
      } = req.body;
      const allReadyExistsUser = await User.findOne({ emailId: emailId });
      if (allReadyExistsUser) {
         throw new Error("allready existes email address");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({
         firstName,
         lastName,
         emailId,
         password: passwordHash,
         photoUrl,
      });
      await user.save();
      res.json({
         message: "user added successfully",
         data: user,
      });
   } catch (err) {
      res.status(400).json({ Error: err.message });
   }
});

authRouter.post("/login", async (req, res) => {
   try {
      const { emailId, password } = req.body;
      if (!validator.isEmail(emailId)) {
         return res.status(404).json({
            message: "Invalid emailId..",
         });
      }
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
         return res.status(404).json({
            message: "user not found",
         });
      }
      const isLogin = await user.isValidatePassword(password);
      if (!isLogin) {
         return res.status(401).json({
            message: "Invalid Password",
         });
      }
      const token = await user.getJWT();
      res.cookie("token", token, { httpOnly: true, signed: true }).json({
         message: "Login successfully!!!!",
         user,
      });
   } catch (err) {
      res.status(400).json({ Error: err.message });
   }
});

authRouter.post("/logout", (req, res) => {
   res.clearCookie("token", null, { path: "/" }).json({
      message: "Logout successfully",
   });
});

authRouter.get("/healt",(req,res)=>
{
   res.status(200).json({
      message:"Route is healty"
   });
});

module.exports = { authRouter };
