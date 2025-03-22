const express = require('express')
const dotenv= require('dotenv')
const connectDB= require('./config/db')
connectDB()
dotenv.config()
const app=express()
const PORT=process.env.PORT || 5000
app.listen(PORT ,()=> console.log("server is started"))