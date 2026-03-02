import User from "../Models/User.js";
import bcrypt from "bcrypt";

const update = async (req, res) => {
    try {
        const { name = "", email = "", password = "" } = req.body;
        const { id } = req.params;

        const existingUser = await User.findById(id);
       
        if (!existingUser) {
            res.status(404).json({ Success: false, message: "User not Found " });

        }

        if (name.trim() !== "") existingUser.name = name;
        if (email.trim() !== "") existingUser.email = email;
        if (password.trim() !== "") {
             const salt = await bcrypt.genSalt(10);
            const hashpas = await bcrypt.hash(password,salt);
            existingUser.password = hashpas;
        }

        const updated = await existingUser.save();

        return res.status(200).json({ success: true, User: updated, message: "employee updated" });
    } catch (error) {
        return res.status(500).json({success : false , error : error.message });

    }


}

export default { update };