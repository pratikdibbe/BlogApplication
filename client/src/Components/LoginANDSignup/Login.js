import React, { useState } from "react";
import "../CSS/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/baseURL";
import toast from "react-hot-toast";

export default function Login() {


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();


 // HANDLE LOGIN API
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/v1/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      // Handle successful login
      // console.log('Login successful', response.data);

      toast.success("Login successful");
      navigate("/");
      // alert("login sucessfull");
      window.location.reload();

      // localStorage.setItem("token", response.data.token);

      // Redirect to the Profile page
    } catch (error) {
      // Handle login error
      // console.error('Login error', error.response.data);
      toast.error("Enter Correct Email or Password");
    }
  };

  return (
    <>

      <div className="containerr">

        <div className="forms">

          <div className="form-content">

            <div className="login-form">

              <div className="title">Login</div>

              <div className="input-boxes">

                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="button input-box">
                  <input
                    type="button"
                    defaultValue="Login"
                    onClick={handleLogin}
                  />
                </div>

                <div className="text sign-up-text">
                  Don't have an account?{" "}<span style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                  >
                    Signup
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
      
    </>
  );
}
