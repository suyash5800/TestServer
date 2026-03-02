import sendOtp from "../Utilis/SendMail.js";
import User from "../Models/User.js";

const reqPassRest = async (req, res) => {
    try {
        const { email } = req.body;

        const userExist = await User.findOne({ email: email });
        if (!userExist) {
            return res.status(404).json({ success: true, message: "User not Found " });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        userExist.otp = otp;
        userExist.otpExpireTime = Date.now() + 10 * 60 * 1000;

        await userExist.save();
        
        const sent = await sendOtp(email,otp);

        if (sent) {
            res.status(200).json({ success: true, message: "Check your email!" });
        } else {
            res.status(500).json({ success: false, message: "Email failed" });
        }



    } catch (error) {
        return res.status(500).json({ success: false, error:error.message });

    }

}

export default reqPassRest;