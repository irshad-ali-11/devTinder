const express = require("express");
const validator = require("validator");
const authRouter = express.Router();
const { validateSingup } = require("../utils/validator");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
authRouter.post("/singup", async (req, res) => {
  try {
    validateSingup(req);
    const { firstName, lastName, emailId, password } = req.body;
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
    });
    await user.save();
    res.json({ message: "added successfully" });
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId))
    {
      throw new Error("Invalid email!!!!");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creditials");
    }
    const isLogin = await user.isValidatePassword(password);
    if (!isLogin) {
      throw new Error("Invalid Password");
    }
    const token = await user.getJWT();
    res.cookie("token",token).send("login");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout",(req,res)=>
{
        res.clearCookie("token",{path:"/"}).send("logout");
})

module.exports = authRouter;
