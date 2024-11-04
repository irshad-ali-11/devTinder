const express = require("express");
const { connectDb } = require("./config/database.js");
const User = require("./models/user");
const {validateSingup} = require("./utils/validator.js")
const bcrypt = require("bcrypt");
const validator = require("validator");
const app = express();
app.use(express.json());

app.post("/singup", async (req, res) => {
  try {
    const {firstName,lastName,emailId,password} = req.body;
     validateSingup(req)
     const passwordHash = await bcrypt.hash(password,10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
    });
    await user.save();
    res.send({ message: "Added user successfully"});
  } catch (err) {
    res.status(400).send({ERROR:err.message});
  }
});
app.post("/login", async (req,res)=>
{
  const {emailId,password} = req.body; 
        try{
                if(!validator.isEmail(emailId))
                {
                   throw new Error("Invalid Email ...");
                }
                const user = await User.findOne({emailId:emailId});
                if(!user)
                {
                    throw new Error("User not fount");
                }
                const result  = await bcrypt.compare(password,user.password);
                if(!result)
                {
                   throw new Error("Invalid Password try again..");
                }
              res.send("login successfully");
        }catch(err)
        {
            res.status(404).send("ERROR : "+ err.message);
        }
})
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
app.patch("/user/:userId", async (req, res) => {
     const {userId} = req.params;
      const data = req.body;
      const ALLOW_UPDATION = ["firstName","lastName","about","skills","age","gender","password"];

      const isUpdateAllow = Object.keys(data).every((k)=> ALLOW_UPDATION.includes(k));
      try{
         if(!isUpdateAllow)
         {
            throw new Error("user can not update");
         }
         if(data.skills?.length > 10)
         {
             throw new Error("skills are not more then 10 ");
         }
        console.log(isUpdateAllow)
    const updateUser = await User.findOneAndUpdate({_id:userId},data);
    if (!updateUser) {
      res.status(404).send("User not found");
      return;
    }
    res.send({ message: "user are updated", data: updateUser });
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
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
