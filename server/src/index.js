import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authController from "../Controller/auth_controller.js";
import connectDb from "../Database_connection/dbconnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDb();


app.use(cors({
    origin: "https://um-stay-client.vercel.app/",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());


app.get("/User", authController.getuser);


app.post("/login", authController.loginUser);
app.post("/User",authController.createUSer);

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});