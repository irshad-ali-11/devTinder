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
// ! singup route -> post
app.post("/singup", async (req, res) => {
  // *validate req data
  try {
    validateSingup(req);

    const { firstName, lastName, emailId, password } = req.body;

    const oldUser = await User.findOne({ emailId: emailId });
    if (oldUser) {
      throw new Error("Your are already singup");
    }

    // *store user data in db

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    if (!user) {
      throw new Error("Invalid credetials");
    }
    await user.save();

    //* res added successfull data

    res.send("added  user successfull ");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// ! login route -> get
app.get("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid email..");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("user not found");
    }
    const isLogin = await user.isValidatePassword(password);
    if (!isLogin) {
      throw new Error("Invalid Password..");
    }
    const token = await user.getJWT();
    res.cookie("token", token).send("Login successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// ! profile route -> get
app.get("/profile", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("invalid credetials");
    }
    const decode = jwt.verify(token, "Irshad");
    const user = await User.findById({ _id: decode._id });
    res.send(user);
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
