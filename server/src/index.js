import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../Models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8535;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL)
.then(()=> console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));


app.get("/",(req,res)=>{res.send("server is running ");});
app.get("/User", async(req,res)=>{
    try{
        const users= await User.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error: err.message});
        }
});


app.post("/User",async(req,res)=>{
 try {
    const {name,email,password}=req.body;
    const newuser = new User({name,email,password});
    await newuser.save();
    res.status(201).json(newuser);
    
 } catch (error) {
    res.status(500).json({error: error.message});
 }
});

app.listen(PORT ,()=>{console.log(`server is running on port ${PORT}`)});