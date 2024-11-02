const express = require("express");
const {connectDb} = require("./config/database.js");
const app = express();

connectDb().then(()=>
{
        console.log("database connect sucessfully ...");
        
app.listen(3000,()=>
        {
                console.log("Server Start...");
        });
}).catch(()=>
{
        console.log("database can not connect ...")
});

