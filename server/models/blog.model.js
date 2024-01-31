const mongoose= require ("mongoose");

const  blogSchema= mongoose.Schema({
    title:{type:String, required: true, unique: true},
   description:{type:String, required: true},
    userId:{type:String, required: true},
});

const BlogModel=mongoose.model("blog", blogSchema);

module.exports= BlogModel;