import User from "../Models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

// get all users (protected route)
const getuser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }
        return res.status(200).json({
            success: true,
            users: users.map(u => ({
                _id: u._id,
                name: u.name,
                email: u.email,
            })),
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// register new user
const createUSer = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

         const hashpass =await bcrypt.hash(password, 10 );


        const newuser = new User({ name, email, password:hashpass });
        await newuser.save();
        return res.status(201).json({ success: true, user: newuser });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// login handler
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
          const hashpass = await bcrypt.compare(password,user.password)
        if (!hashpass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const jwt_key = process.env.JWT_KEY;
        if (!jwt_key) {
            return res.status(500).json({ message: "Server misconfigured: JWT_KEY missing" });
        }
        const token = jwt.sign({ id: user._id, name: user.name }, jwt_key, { expiresIn: "1d" });
        res.cookie("token",token);
        return res.status(200).json({ success: true, token });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export default { getuser, createUSer, loginUser };
