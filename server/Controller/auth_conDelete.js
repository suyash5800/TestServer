import User from "../Models/User.js";

const DeleteUser = async (req, res) => {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    return res.status(200).json({ sucess: true, message: "sucessfully deleted" });



};


const DeleteAll =async (req , res)=>
    {
       
        await User.deleteMany({});
        return res.status(200).json({success : true , message : "all users are delete"});

    }

export default  {DeleteUser, DeleteAll};