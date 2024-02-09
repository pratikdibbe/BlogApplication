import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import "../CSS/Blog.css";


export default function Blog() {



  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [auther, setAuther] = useState(""); 

  const [imageFile, setImageFile] = useState(null);

  const [blogs, setBlogs] = useState([]);

  const [userEmail, setUserEmail] = useState(null);

  const [decoded, setDecoded] = useState(null);

  const [selectedBlogId, setSelectedBlogId] = useState(null);



  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };


  const handleAutherChange = (e) => {
    setAuther(e.target.value);
  };

   // Function to handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  

  // Function to upload image to Firebase
  const uploadImg = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(`${baseURL}/api/v1/img/upload`, formData);
        if (response.status === 200) {
            return response.data.imageUrl;
        } else {
            console.error("Failed to upload image");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
    }
  };



  const getUserBlogs = () => {
    return blogs.filter((blog) => blog.blogadder === userEmail);
  };


 // GET ALL BLOGS API
  const getBlogList = async () => {
    try {

      const response = await axios.get(`${baseURL}/api/v1/blog/getallblogs`);
      const blogsData = response.data.AllblogsGet;
      console.log(blogsData);

      setBlogs(blogsData);

    } catch (error) {

      console.error("Error fetching blogs:", error);
    }

  };


  useEffect(() => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    setDecoded(decodedToken);
    setUserEmail(decodedToken ? decodedToken.email : null);
  }, []);


  useEffect(() => {
    getBlogList();
  }, []);




  // HNADLE CREATE BLOG API CODE
  const handleCreateBlog = async () => {
    try {
      
      const imageUrl = await uploadImg(imageFile);
      const response = await axios.post(`${baseURL}/api/v1/blog/createblog`, {
        title,
        description,
        blogadder: decoded.email,
        firebaseImageUrl: imageUrl,
        auther,
      });

      const data = response.data;
      toast.success(" Blog Created Successfully");

      if (data.success) {
        setTitle("");
        setDescription("");
        setAuther(""); 
        setImageFile(null);
        getBlogList();
        
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
};


  // HANDLE UPDATE BLOG API CODE
  
const handleUpdateBlog = async () => {
  try {
    let imageUrl = null; 

    // Check if a new image is selected
    if (imageFile) {
      imageUrl = await uploadImg(imageFile); 
    }

    const response = await axios.put(
      `${baseURL}/api/v1/blog/updateblog/${selectedBlogId}`,
      {
        title,
        description,
        auther, 
        firebaseImageUrl: imageUrl, 
      }
    );

    const data = response.data;
    toast.success("Blog Updated Successfully");

    if (data.success) {
      setTitle("");
      setDescription("");
      setAuther("");
      setSelectedBlogId(null);
      // setImageFile(null); 
      getBlogList();
    } else {
      toast.error("Failed to update blog.");
    }
  } catch (error) {
    console.error("Error updating blog:", error);
  }
};


  // HANDLE DELETE BLOG API CODE
  const handleDeleteBlog = async (BlogId) => {
    try {
      const response = await axios.delete(
        `${baseURL}/api/v1/blog/deleteblog/${BlogId}`
      );
      const data = response.data;

      if (data.success) {
        getBlogList();
        toast.success("Blog Deleted Successfully");
      } else {
        toast.error("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };


  const handleEditBlog = (BlogId) => {

    const selectedBlog = blogs.find((blog) => blog._id === BlogId);

    if (selectedBlog) {

      setTitle(selectedBlog.title);
      setDescription(selectedBlog.description);
      setAuther(selectedBlog.auther); 
      setSelectedBlogId(BlogId);
      // setImageFile(selectedBlog.firebaseImageUrl); 
    }
  };

  return (
    <>

      <div className="containerr">

        <h2>Write Your own Blog</h2>

        <div>
          <label htmlFor="BlogName">Blog Title</label>
          <input
            type="text"
            id="BlogtitleName"
            value={title}
            onChange={handleTitleChange}
          />
        </div>


        <div>
          <label htmlFor="description">Your Blog</label>
          <textarea
            rows="5"
            cols="10"
            className="txtareat blogtextarea"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        {/* Imag  */}
          <div>
            <label htmlFor="image">Choose Image:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>




        <div>
          <label htmlFor="Blogauther">Auther</label>
          <input
            type="text"
            id="AutherName"
            value={auther}
            onChange={handleAutherChange}
          />
        </div>


        {selectedBlogId ? (
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleUpdateBlog}
          >
            Update Blog
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary "
            onClick={handleCreateBlog}
          >
            Create Blog
          </button>
        )}
      </div>


      <div className="container">
        {getUserBlogs().map((singleBlog) => (
          <div
            className="card mb-3"
            style={{ maxWidth: 600 }}
            key={singleBlog._id}
          >
            <div className="row g-0">
              <div className="col-md-4">
               
              </div>
              <div className="col-md-8">

                <div className="card-body">

                <img
                     className="card-img-top img-fluid img_Blog"
                     style={{
                              width: "513px",
                              height: window.innerWidth < 400 ? "206px" : "282px", // Set height based on screen width
                              marginBottom: "12px",
                              borderRadius: "inherit",
                              marginLeft: "inherit" // Added margin-left
                            }}
                            src={singleBlog.firebaseImageUrl}
                            alt="blogimg"
                />

                  <h5 className="card-title fs-2 text">{singleBlog.title}</h5>
                  <hr />

                  <p className="card-text">{singleBlog.description}</p>

                  <p>Auther: {singleBlog.auther}</p>

                  <p>
                    Created At:{" "}
                    {new Date(singleBlog.createdAt).toLocaleDateString()}
                  </p>


                  <button
                    type="button"
                    className="btn btn-primary mx-2 btncreateblog"
                    onClick={() => handleDeleteBlog(singleBlog._id)}
                  >
                    Delete
                  </button>


                  <button
                    type="button"
                    className="btn btn-warning mx-2 btncreateblog"
                    onClick={() => handleEditBlog(singleBlog._id)}
                  >
                    Update
                  </button>


                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
      
    </>
  );
}
