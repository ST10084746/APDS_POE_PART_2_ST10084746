const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const postRoutes = require("./routes/postroutes.js")
const  userRoutes =  require("./routes/userroutes.js")
const fs = require('fs')

const PORT = process.env.PORT|| 3000;
const app = express();

app.use(cors());
const cert = fs.readFileSync('keys/certificate.pem');

const options  = {
    server:{sslCA: cert}
}
mongoose.connect(process.env.ATLAS_URI)
.then(()=>{
    console.log('Connected')
})
.catch((e)=>{
    console.log(e.message)
    console.log('Not Connected')
}, options)

app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
})
app.use(express.json())
app.use('/user', userRoutes);
app.use('/post', postRoutes);



module.exports= app;