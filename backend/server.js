import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import AuthRouter from "./routes/AuthRouter.js";
import UserRouter from "./routes/UserRouter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 6001 ;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

// Import routes
app.use('/api/auth', AuthRouter);
app.use('/api/admin', UserRouter);
// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});