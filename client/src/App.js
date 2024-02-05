import Homepage from "./Components/Home/Homepage";
import Navbar from "./Components/Home/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/LoginANDSignup/Login";
import Signup from "./Components/LoginANDSignup/Signup";
import Blog from "./Components/Blog/Blog";
import Footer from "./Components/Home/Footer";
import { Toaster } from "react-hot-toast";
import './App.css';




function App() {
  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createblog" element={<Blog />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
