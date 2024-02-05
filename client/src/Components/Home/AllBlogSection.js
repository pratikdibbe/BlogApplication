import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseURL";
import "../CSS/AllBlog.css";

export default function AllBlogSection() {


  const [blogs, setBlogs] = useState([]);

  // GET ALL BLOGS API CODE
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
    getBlogList();
  }, []);

  return (
    <>
      <div className="allblogmaindiv">
        <div className="blogheader">
          <h2>Recently Posted Blogs </h2>
        </div>
        <div className="container my-4">
          {blogs.map((singleBlog) => (
            <div
              key={singleBlog._id}
              className="card mb-3"
              style={{ maxWidth: 600 }}
            >
              <div className="row g-0 ">
                <div className="col-md-4"></div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fs-2 text" style={{color:"darkblue"}}>{singleBlog.title}</h5>
                    <hr />
                    <p className="card-text">{singleBlog.description}</p>
                    <p style={{color:"red"}}>Author: {singleBlog.auther}</p>
                    <p>
                      Created At:{" "}
                      {new Date(singleBlog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
