const express = require("express");
const app = express();

app.use((req,resp)=>
{
        resp.send("Hello From Server");
});
app.use("/hello",(req,resp)=>
{
        resp.send("Hello Hello hello");
})

app.listen(3000,()=>
{
        console.log("Server Start...");
})