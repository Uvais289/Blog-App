const express = require("express")
const dotenv= require("dotenv");
const { Connection  } = require("./config/db");
const authRouter = require("./routes/auth.routes");
const cookiParser= require("cookie-parser");
const authCheck = require("./middlewares/auth.middleware");
const blogRouter= require("./routes/blog.routes");
dotenv.config();


const app= express();
const port= process.env.PORT;

app.use(express.json());
app.use("/auth",authRouter);
app.use(cookiParser());
app.use( "/blogs", authCheck, blogRouter);

app.get("/home", (req,res)=>{
    res.send({message:"Hey there!"})
})

app.listen(port, async()=>{
    try{
        await Connection;
        console.log(`Listening on port ${port}`)
    }catch(error){
        console.log("Error:", error);
    }
});
 
