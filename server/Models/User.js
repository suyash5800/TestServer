
import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type:String,
        requird:true
    },
}, 
{
    timestamps: true,
});

 export default mongoose.model("User",userschema);

