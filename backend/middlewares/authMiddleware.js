import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";


// Middleware to authenticate user
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}

// Middleware to check role
export const authorize = (...allowedRoles) =>{
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
        }
        next();
    };
};