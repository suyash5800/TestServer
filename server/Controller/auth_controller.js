import User from "../Models/User.js";
import bcrypt from "bcrypt";


import jwt from "jsonwebtoken";


const getuser = async (req, res) => {
    try {

         if(!req.userId)
            {
                return res.status(404).json({success:false, message:"Unauthorized access"});
            }

            const user = await User.findById(req.UserId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,

            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server error while fetching profile"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(404).json({ message: "Email already in use" });
        }

        const hashpass = await bcrypt.hash(password, 10);


        const newuser = new User({ name, email, password: hashpass });
        await newuser.save();

        return res.status(201).json({
            success: true,
            user: {
                _id: newuser._id,
                name: newuser.name,
                email: newuser.email
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const jwt_key = process.env.JWT_KEY;

        if (!jwt_key) {
            return res.status(500).json({ message: "Server misconfigured: JWT_KEY missing" });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            jwt_key,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,   
            secure: true,      
            sameSite: "none",  
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({success: true, message:"succesfully login"});



    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export default { getuser, createUser, loginUser };
