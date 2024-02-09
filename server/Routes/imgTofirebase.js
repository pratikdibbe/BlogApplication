const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const path = require("path");


// Import the imgHandler function
const { UploadImgToFirebaseHandler } = require('../controller/imgController');


// Set up multer middleware
const upload = multer({ storage: multer.memoryStorage() });


// uplaod img with multer middleware
router.post("/upload", upload.single("image"), UploadImgToFirebaseHandler);


module.exports = router;