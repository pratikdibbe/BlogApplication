const mongoose = require("mongoose");


const blog_model_schema = new mongoose.Schema({

    title: {
      type: String,
      required: [true, "Please Enter Title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Your Blog"],
    },
    image:{
      type: String,
      required: [false, "Please Enter image"],
    },
    firebaseImageUrl: { 
      type: String,
      required: [false, "Firebase Image URL"],
    },
    blogadder: {
      type: String,
      required: [true, "Please Enter Email"],
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    auther:{
      type:String,
      required: [true, "Please Enter auther name"],
    },
    
   
});
  
  module.exports = mongoose.model('blogSchema', blog_model_schema);                       