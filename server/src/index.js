import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authController from "../Controller/auth_controller.js";
import connectDb from "../Database_connection/dbconnection.js";
import  authmiddleware from "../middelware/verifytoken.js";
import auth_conDelete from "../Controller/auth_conDelete.js"
import auth_conUpdate from "../Controller/auth_conUpdate.js";
import auth_conSendMail from "../Controller/auth_conSendMail.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

 await connectDb();


const allowedOrigins = [
  "http://localhost:5173",
  "https://um-stay-client.vercel.app"
];
app.options("*", cors());
app.use(cookieParser())
app.use(express.json());
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



app.get("/getUser", authmiddleware ,authController.getuser);


app.post("/login",authController.loginUser);
app.post("/registor",authController.createUser);
app.delete("/delete/:id" ,auth_conDelete.DeleteUser);
app.delete("/deleteAll" ,auth_conDelete.DeleteAll);
app.put("/update/:id" ,auth_conUpdate.update);
app.post("/sendEmail", auth_conSendMail.reqOTP );
app.post("/verifyOTP" , auth_conSendMail.verifyOTP);

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});