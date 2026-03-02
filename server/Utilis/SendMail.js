import nodemailer from "nodemailer";

const sendOtp = async (email, otp) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.Mailer_mail,
                pass: process.env.Mailer_pass,
            },
        });

        const mailOption = {
            from: process.env.Mailer_mail,
            to: email,
            subject: "Your One time password",
            text: `Dear User,

We received a request to access your account. Please use the One-Time Password (OTP) below to proceed:

OTP Code:${otp}

This code is valid for the next **10 minutes**. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email or contact our support team immediately.

Thank you,
Um-Stay service Team.
.`,
        }

        await transporter.sendMail(mailOption);
        console.log("Otp is sended");
        return true;


    } catch (error) {
        console.log("Email error :", error);
        return false;

    }
}

export default sendOtp;