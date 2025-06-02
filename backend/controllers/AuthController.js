import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, address, password, role } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            name,
            email,
            address,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Login a user
export const loginUser = async (req, res) =>{
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

       const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: '1d'
       }) 

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, address: user.address, role: user.role } });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}