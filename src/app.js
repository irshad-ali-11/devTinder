const express = require("express");
const { connectDb } = require("./config/database.js");
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/singup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Added user successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});
app.get("/user",async (req,res)=>
{
        
        try{
                const user  = await User.findOne({emailId:req.body.emailId});
                if(!user)
                {
                        res.send("User not found");
                        return;
                        
                }
                res.send(user)
        }
        catch(err){
                res.status(400).send("Someting went wrong ");
        }
       
})
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
