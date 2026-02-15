import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import User from "../Models/User.js";
import authController from "../Controller/auth_controller.js";
import connectDb from "../Database_connection/dbconnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8535;

connectDb();


app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{res.send("server is running ");});
app.get("/User", authController.getuser);


app.post("/User",authController.createUSer);

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});