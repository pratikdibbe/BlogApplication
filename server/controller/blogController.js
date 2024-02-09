const blogSchema = require('../model/blog_schema');

// create new blog handler
const CreateNewBlog = async (req, res) => {
    try {

        const { title, description, blogadder, auther , image , firebaseImageUrl    } = req.body;

        // const response = await blogSchema.create({ title , description, blogadder,  auther});
        const response = await new blogSchema({ 
          title , description , image , firebaseImageUrl, blogadder, auther
        }).save();

        // console.log('ppppppp', response);

        res.status(201).send({
          success: true,
          message: "new blog created",
          response,
        });

        // res.status(200).json(
        //     {
        //         success: true,
        //         data: response,
        //         message: 'Entry Created Successfully'
        //     }
        // );
  
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Creating New blog",
        error,
      });
    }
};


// GET ALL BLOGS
const GetAllBlogs = async (req, res) => {

    try {

      const AllblogsGet = await blogSchema.find();

      res.status(200).json({
        success:true,
        message:"Sucessfully get all blogs",
        AllblogsGet
      });
      
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in fetching all blogs",
        error,
      });
    }
};


// GET SINGLE BLOGS
const GetSingleBlog = async (req, res) => {
    try 
    {
      // Extract single blog  based on id
      const id = req.params.id;
      const singleblog = await blogSchema.findById({ _id: id });

      // Data for the given id not found
      if (!singleblog) {
          return res.status(404).json({
              success: false,
              message: "No Data Found with Given Id",
          });
      }

      // Data for the given id FOUND
      res.status(200).json({
          success: true,
          data: singleblog, 
          message: `Single blog ${id} data successfully fetched`,
      });
      

  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error to get blog",
        error,
      });
    }
};


// DELETE BLOGS
const DeleteBlog = async (req, res) => {
    try {
      const { id } = req.params;

      await blogSchema.findByIdAndDelete(id);

      res.json({
          success: true,
          message: "BLOG DELETED",
      })
  
      
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in deleting the blog",
        error,
      });
    }
};


// UPDATE BLOGS
const updateBlog = async (req, res) => {
    try 
    {  
      const blogupdate = await blogSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });


  
      if (!blogupdate) {
        return res.status(404).json({ error: 'blog not found' });
      }

      res.status(200).json({
        success:true,
        message:"Blog updated",
        blogupdate
      });
      
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while updating the blog",
        error,
      });
    }
};



// GET BLOG BY EMAIL ID
const getBlogByEmail = async (req, res) => {
    try
   {
        const email = req.params.email;
       

        
        const blogrelatedtoemail = await blogSchema.find({ blogadder: email });

        
        if (blogrelatedtoemail.length === 0) {
            return res.status(404).json({ message: 'No blog found for this email.' });
        }

        res.json({
          success:true,
          message:"Your created blogs are ",
          blogrelatedtoemail
        });
      
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Creating New blog",
        error,
      });
    }
};



// EXPORT ALL MODULES
module.exports = {
    CreateNewBlog,
    GetAllBlogs,
    DeleteBlog,
    GetSingleBlog,
    DeleteBlog,
    updateBlog,
    getBlogByEmail
  };