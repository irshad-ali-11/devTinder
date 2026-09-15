const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/userAuth.js");
const { validateProfileEdit } = require("../utils/validator.js");
profileRouter.get("/profile/view", userAuth, (req, res) => {
   try {
      const user = req.user;
      res.json({ message: "User profile ", data: user });
   } catch (error) {
      res.status(400).json({ ERROR: error.message });
   }
});

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
   try {
      validateProfileEdit(req);
      const loginUser = req.user;
      Object.keys(req.body).forEach((key) => (loginUser[key] = req.body[key]));
      const newUser = await loginUser.save();
      res.json({ message: "Profile Update  are successfully", data: newUser });
   } catch (error) {
      res.status(400).json({
         error: error.message,
      });
   }
});

module.exports = { profileRouter };
