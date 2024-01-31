const Router= require("express").Router;
require("dotenv").config();
 
const BlogModel = require("../models/blog.model"); 
const blogRouter = Router();

blogRouter.get("/", async(req,res)=>{
    const blogs= await BlogModel.find();
    res.send({message:"Blogs", blogs});
})

blogRouter.post("/", async(req,res)=>{
    try{
        const {title, description, userId}= req.body;
        const newBlog= new BlogModel({title, description, userId});
        await newBlog.save();
        res.send({message:"Blogs created.", newBlog});
    }catch(error){
        res.send({message:"Error", error:error.message})
    }
})

blogRouter.delete("/:blogId", async (req, res) => {
    try {
      const { blogId } = req.params;
      const { userId } = req.body;
  
      const blog = await BlogModel.findById(blogId);
  
      if (!blog) {
        throw new Error("Blog not found");
      }
  
      const userIdOfBlogCreator = blog.userId;
  
      if (userIdOfBlogCreator === userId) {
        await BlogModel.findByIdAndDelete(blogId);
        res.send({ message: "Blog deleted successfully!" });
      } else {
        throw new Error("Not authorized to delete blog!");
      }
    } catch (error) {
      res.send({ message: "Error", error: error.message });
    }
  });
  

module.exports= blogRouter