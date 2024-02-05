const express = require('express');
const router = express.Router();

// IMPORT CONTROLLER HANDLER
const
{ signupController ,
  loginController,
  authtokenController

} = require('../controller/authcontroller')





// LOGIN AND SIGNUP ROUTE
router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/auth", authtokenController);

module.exports = router;

