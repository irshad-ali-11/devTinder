const express = require("express");
const app = express();


app.get("/hello",(req,resp)=>
{
   resp.send("Hello From Server");
})

app.listen(3000,()=>
{
        console.log("Server Start...");
})