const Router= require("express");
require("dotenv").config();
const UserModel= require("../models/auth.model")
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken")
const authRouter= Router();

authRouter.get("/me", (req,res)=>{
    res.send({message:"It's me!"});

})

authRouter.post("/signup", async(req,res)=>{
    try{
        const{username, email, password}=req.body;
        const isUserPresent= await UserModel.findOne({email});
        if(isUserPresent) throw new Error(`User with ${email} already exists`);

        const hashedPassword= bcrypt.hashSync(password,10);

        const newUser= new UserModel({username, email, password: hashedPassword});
        await newUser.save();
        res.send({message:"User created!", user:newUser});
    }catch(error){
        res.send({message:"Error!", error});
    }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const isUserPresent = await UserModel.findOne({ email });
      if (!isUserPresent) throw new Error(`User with ${email} does not exist`);
  
      const comparePassword = bcrypt.compareSync(password, isUserPresent.password);
  
      if (!comparePassword) throw new Error("Invalid credentials");
  
      const token = jwt.sign(
        { userId: isUserPresent._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      res.cookie("blog-access-token", token);
      res.send({
        message: "User logged In!",
        username: isUserPresent.username,
        userId: isUserPresent._id,
        accessToken: token,
      });
    } catch (error) {
      res.send({ message: "Error!", error });
    }
  });
  
module.exports= authRouter;