
import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: String,
    email: { type:String, required: true,Unique : true},
    password: {
        type:String,
        requird:true
    },
    otp:String,
    otpExpireTime:Date
}, 
{
    timestamps: true,
});

 export default mongoose.model("User",userschema);

