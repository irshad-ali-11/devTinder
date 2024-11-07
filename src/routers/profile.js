const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/userAuth.js")

profileRouter.get("/profile/view",userAuth,(req,res)=>
{
        const user = req.user;
        res.send(user);
}
);

module.exports = {profileRouter}