
import User from "../Models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

//for getting all users
const getuser = async (req, res) => {

    dotenv.config();
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json(error, error.message);
        }
       const jwt_key = process.env.JWT_KEY;
       const token = jwt.sign(
             { _id:users.id ,name:users.name
                
            } ,jwt_key,{expiresIn:"1d"});


       
    return res.status(200).json({
      success: true,
      token,
      users: users.map(u => ({
        _id: u._id,
        name: u.name,
        email: u.email
      }))
    });

    } catch (error) {
      return res.status(500).json({ success:false ,error: error.message });

    }
};

//for creating a new user
const createUSer = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newuser = new User({ name, email, password });
        await newuser.save();
        res.status(201).json(newuser);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
}


export default { getuser, createUSer };
