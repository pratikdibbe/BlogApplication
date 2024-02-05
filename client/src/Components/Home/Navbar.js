import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';


export default function Navbar() {


  const navigate = useNavigate();


  let decoded = null;


  if (localStorage.getItem("token")) {
    decoded = jwtDecode(localStorage.getItem("token"));
  }


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful");
    // window.location.reload();
    navigate('/');
    window.location.reload();

  };

  return (
    <>

      <nav className="Navbar navbar navbar-expand-lg bg-body-tertiary sticky-top " >

        <div className="container-fluid">

          {/* <Link className="navbar-brand" to="/">
            <h2>img here</h2>
          </Link> */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>



          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>


              {!decoded && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}

              {decoded && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/createblog">
                      MyBlog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" >
                      <span>{decoded.name} |</span>
                      <span onClick={handleLogout} style={{color:"red" , fontWeight:"500"}}> Logout</span>
                    </Link>
                  </li>
                </>
              )}

            </ul>

          </div>

        </div>

      </nav>

    </>
  );
}
