const express = require("express");
const app = express();


app.use("/hello",(req,resp)=>
{
        resp.send("Hello Hello hello");
})
app.use("/test",(req,resp)=>
{
        resp.send("Test from server");
})

app.listen(3000,()=>
{
        console.log("Server Start...");
})