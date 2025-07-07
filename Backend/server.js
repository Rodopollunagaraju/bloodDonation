const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");  
const donorRoutes = require("./routes/donor");
const authRoutes=require("./routes/auth");
const patient =require("./routes/patient")
const {checkForAuthenticationCookie}=require('./middleware/token-auth')
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,  
}));
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthenticationCookie("token"));
// Routes
app.use("/api/donor", donorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patient",patient)
const dashboardRoute = require("./routes/dashboard");
const { getEventListeners } = require("nodemailer/lib/xoauth2");
const { listenerCount } = require("./models/Patient");
app.use("/api/dashboard", dashboardRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
