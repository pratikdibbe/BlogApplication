const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const userModel = require("../model/user_schema");
const saltRounds = 10;

// SIGNUP CONTROLLER HANDLER
const signupController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // validation
      if (name.trim().length === 0) {
        res.status(400).json({ message: "Please Enter a Name" });
        return false;
      }
  
      if (!isEmail(email)) {
        res.status(400).json({ message: "Please Enter a valid email" });
        return false;
      }
  
      if (password.trim().length === 0) {
        res.status(400).json({ message: "Please Enter password" });
        return false;
      } else if (password.trim().length <= 5) {
        res
          .status(400)
          .json({ message: "Minimum password length is 6 characters" });
        return false;
      }
  
      // check if email exists in DB!
      const existingUser = await userModel.findOne({ email: email }).exec();
      if (existingUser) {
        console.log("Email Already Registered");
        res.status(400).json({ message: "Email Already Registered" });
        return false;
      }
  
      // secure password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await userModel.create({ name, email, password: hashedPassword });
  
      return res.json({
        message: "Account Created Successfully",
        // entry show in database
        user: { _id: newUser._id, name: newUser.name, email: newUser.email },
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registration",
        error,
      });
    }
  };


// LOGIN CONTROLLER HANDLER
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email or Password',
            });
        }

        // Check if the user email is already registered
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'Email is not Registered',
            });
        }

        // Check if the entered password matches the stored hashed password
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Password',
            });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: existingUser._id , name:existingUser.name , email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).json({
            success: true,
            message: 'Login Successfully',
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};


// TOKEN CHECK CONTROLLER
const authtokenController = async (req, res) => {
  const { token } = req.body;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);

      res.json({
        auth: true,
        data: decode,
      });
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};


// EXPORT ALL MODULES
module.exports = {
  signupController,
  loginController,
  authtokenController,
};
