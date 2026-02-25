import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
app.get("/hell",(req,res)=>{res.send("hello from hell")})

app.post("/login", authController.loginUser);

app.post("/User",authController.createUSer);

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});