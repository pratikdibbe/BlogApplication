import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/baseURL";
import axios from 'axios';
import toast from 'react-hot-toast';



export default function Signup() {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigate = useNavigate();


 // HANDLE SIGNUP API CODE 
  const handleSignup = async () => {

    try {
      const response = await axios.post(`${baseURL}/api/v1/auth/signup`, {
        name,
        email,
        password,
      });

      // Handle successful signup
      // console.log('Signup successful', response.data);
      // alert("Signup sucessfull");
      toast.success("Account created successfully");
      navigate('/login'); 

    } catch (error) {
      // Handle signup error
      const errorMessage = error.response?.data || 'An error occurred during signup.';
      console.error('Signupppp error', errorMessage);
      // toast.error('Signup error', Message);
      toast.error("Account not created");
    }
  };



  return (
    <>
      <div className="containerr">

        <div className="forms">

          <div className="form-content">

            <div className="signup-form">

              <div className="title">Signup</div>

              
                <div className="input-boxes">


                  <div className="input-box">

                    <input
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      placeholder="Enter your name"
                      
                    />
                  </div>

                  <div className="input-box">
                    <input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      placeholder="Enter your email"
                     
                    />
                  </div>


                  <div className="input-box">
                    <input
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />

                  </div>

                  <div className="button input-box">
                    <input type="button" defaultValue="Signup" onClick={handleSignup} />
                  </div>

                  <div className="text sign-up-text">
                    Already have an account?{" "}<span style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => navigate("/login")}>
                     Login
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


