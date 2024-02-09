const express = require('express');
const router = express.Router();

// IMPORT CONTROLLER HANDLER
const
{ signupController ,
  loginController,

} = require('../controller/authcontroller')



// LOGIN AND SIGNUP ROUTE
router.post("/signup", signupController);
router.post("/login", loginController);

module.exports = router;

