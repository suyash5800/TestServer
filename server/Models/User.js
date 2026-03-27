
import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: String,
    email: { type:String, required: true,Unique : true},
    phone:{type:Number , requird:true , Unique :true},
    password: {
        type:String,
        requird:true
    },
  
}, 
{
    timestamps: true,
});

 export default mongoose.model("User",userschema);

