const express = require("express");
const { connectDb } = require("./config/database.js");
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/singup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send({message:"Added user successfully",data:user});
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.send("User not found");
      return;
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Someting went wrong ");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const allUser = await User.find({ gender: req.body.gender });
    if (!allUser.length) {
      res.status(404).send("user not found");
      return;
    }
    res.send(allUser);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.patch("/update", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { firstName: req.body.firstName },
      req.body,
      { new: true }
    );
    if (!updateUser) {
      res.status(404).send("User not found");
      return;
    }
    res.send({ message: "user are updated", data: updateUser });
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.body);
    if (!deletedUser) {
      res.status(404).send("user are not found");
      return;
    }
    res.send({ message: "User are deleted successfully ", data: deletedUser });
  } catch (err) {
    res.status(400).send("something went wrong");
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
