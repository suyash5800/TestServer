import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authController from "../Controller/auth_controller.js";
import connectDb from "../Database_connection/dbconnection.js";
import  authmiddleware from "../middelware/verifytoken.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDb();


const allowedOrigins = [
  "http://localhost:5173",
  "https://um-stay-client.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());


app.get("/getUser", authController.getuser);


app.post("/login",authController.loginUser);
app.post("/registor",authController.createUser);

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});