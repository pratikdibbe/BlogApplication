const express = require("express");
const path = require("path");
const authRoute = require('./Routes/authRoute')
const blogRoute = require('./Routes/blogRoute')
const connectDB = require('../server/config/database')
const cors = require('cors');
const morgan = require('morgan');
const UploadImgToFirebaseRoute = require('./Routes/imgTofirebase');


require("dotenv").config();


const app = express();



//midlware
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/blog', blogRoute);
app.use('/api/v1/img', UploadImgToFirebaseRoute);



//PORT
const PORT = process.env.PORT || 3100;



//database CONNECTION
connectDB();



app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNING ON THE PORT NO  ${PORT}`);
})


app.get('/',(req,res) => {
    res.send({
        message: 'Welcome to BLOG APPLICATION'
    })
})



