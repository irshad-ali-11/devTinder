const express = require("express");
const { connectDb } = require("./config/database.js");
const User = require("./models/user");
const { validateSingup } = require("./utils/validator.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/singup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSingup(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    
    await user.save();
    res.send({ message: "Added user successfully" });
  } catch (err) {
    res.status(400).send({ ERROR: err.message });
  }
});
app.get("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email ...");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not fount");
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Invalid Password try again..");
    }
    const token = jwt.sign({ _id: user._id }, "Irshad",{expiresIn:"1h"});

    res.cookie("token", token,{httpOnly:true,expires:0});
    res.send("login successfully");
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});
app.get("/profile", async (req, res) => {
  try {
    console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Invalid Credential");
    }
    const decode = jwt.verify(token, "Irshad");
    const oneUser = await User.findOne({ _id: decode._id });

    res.send(oneUser);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
connectDb()
  .then(() => {
    console.log("database connect sucessfully ...");

    app.listen(3000, () => {
      console.log("Server Start... 3000");
    });
  })
  .catch(() => {
    console.log("database can not connect ...");
  });
