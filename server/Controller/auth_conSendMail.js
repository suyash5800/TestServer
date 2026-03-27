import sendOtp from "../Utilis/SendMail.js";
import otp from "../Models/otp.js";

const reqPassRest = async (req, res) => {
    try {
        const email = req.body.email.trim().toLowerCase();


        const genOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const existingOtp = await otp.findOne({ email });
        console.log(existingOtp);
        await otp.deleteOne({ email });

        const newotp = new otp({
            email, otp: genOTP,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        });
        await newotp.save();

        const sent = await sendOtp(email, genOTP);

        if (sent) {
            console.log(genOTP);
            return  res.status(200).json({ success: true, message: "Check your email!" });
        } else {
            res.status(500).json({ success: false, message: "Email failed" });
        }



    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });

    }

}

const verifyOTP = async (req, res) => {
    try {

        const { email, code } = req.body;

        const userExist = await otp.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "mail not found" });

        }

        if (userExist.otp !== code) {
            return res.status(400).json({ success: false, message: "OTP doesn't match " });
        }

        if (userExist.expiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        return res.status(200).json({ success: true, message: "OTP is verifyed" });

    } catch (error) {
        return res.status(500).json({ sucess: false, error: error.message });

    }

}

export default { reqPassRest, verifyOTP }; 