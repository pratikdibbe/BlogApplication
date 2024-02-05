import React from 'react'
import "../CSS/Section1.css";
import first from "../Images/firstimg.jpg";
import imgsecond from "../Images/img2.jpg";
import imgthird from "../Images/img3.jpg";



export default function Section1() {

    
  return (
    <>
        {/* section1 */}

        <div>

            <div className="maindiv">
            </div>

            <div className="box2">
                <h3 className='howitwork'>HOW IT WORKS</h3>
            </div>

        </div>


        
        {/* section2 */}
        <div className="main">

            <div className='row Section3 container '>


                <div className="col-md-3 mx-2 x">
                    <img src={first} alt="" className='img-fluid' />

                    <h6>Write Blogs </h6>
                    <p className='txt'>Discover captivating stories and insightful articles on our diverse blog</p>
                </div>


                <div className="col-md-3 mx-2 x">
                    <img src={imgsecond} alt="" className='img-fluid'/>


                    <h6>See other's Blog</h6>
                    <p className='txt'>Explore diverse ideas from technology to lifestyle in our rich blog.</p>
                </div>


                <div className="col-md-3 mx-2 x">
                    <img src={imgthird} alt="" className='img-fluid' />
                    <h6>Post Blog</h6>
                    <p className='txt'> Dive into diverse posts, spark conversations, engage enthusiasts. </p>
                </div>


            </div>
        </div>

    </>
  )
}
