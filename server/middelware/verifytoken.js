import jwt from "jsonwebtoken";

const authmiddleware = (req,res,next) => {
    const header = req.cookies.token;

    if (!token) {
        return res.status(401).json({success:false, message: "No token" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch(error) {
        res.status(401).json({sucess: false, message: "Invalid token" });
    }

}
export default authmiddleware;

