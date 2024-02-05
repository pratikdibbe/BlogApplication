const express = require('express');
const router = express.Router();

// IMPORT CONTROLLER HANDLER 
const {
    CreateNewBlog,
    GetAllBlogs,
    GetSingleBlog,
    DeleteBlog,
    updateBlog,
    getBlogByEmail
} = require("../controller/blogController"); 



// create new blog
router.post("/createblog", CreateNewBlog);

// get all blogs
router.get("/getallblogs", GetAllBlogs);

// get blog by id (single blog)
router.get("/getsingleblog/:id", GetSingleBlog);

// delete blog
router.delete("/deleteblog/:id", DeleteBlog);

// update blog
router.put("/updateblog/:id", updateBlog);


// get blog by email
router.get("/getblogbyemail/:email", getBlogByEmail);


module.exports = router;
