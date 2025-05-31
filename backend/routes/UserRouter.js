import express from 'express';
import { getDashboardData, getUserDetails, ListUsers } from '../controllers/UserController';
import { protect , authorize } from "../middlewares/authMiddleware.js"

const UserRouter = express.Router();

UserRouter.get('/dashboard',protect, authorize('admin'), getDashboardData);
UserRouter.get('/list',protect, authorize('admin'), ListUsers);
UserRouter.get('/:id',protect, authorize('admin'), getUserDetails);

export default UserRouter;