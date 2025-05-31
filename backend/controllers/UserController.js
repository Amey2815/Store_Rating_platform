import UserModel from '../models/UserModel.js';
import StoreModel from '../models/StoreModel.js';
import RatingModel from '../models/RatingModel.js';


export const getDashboardData = async (req, res) => {
    try {
        const totalUsers = await UserModel.countDocuments();
        const totalStores = await StoreModel.countDocuments();
        const totalRatings = await RatingModel.countDocuments();
        res.json({
            totalUsers,
            totalStores,
            totalRatings
        });
    }
    catch (error) {
        return res.status(500).json({message: "Error fetching dashboard data"});
    }
}

export const ListUsers = async (req, res) => {
    try {
        const {name, email, address , role , sort = 'name'} = req.query;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        if (email) filter.email = { $regex: email, $options: 'i' }; // Case-insensitive search
        if (address) filter.address = { $regex: address, $options: 'i' }; // Case-insensitive search
        if (role) filter.role = role; // Exact match for role

        const users = await UserModel.find(filter).select('-password');
        res.json(users);
    }
    catch (error) {
        return res.status(500).json({message: error.message });
    }
}

export const getUserDetails = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id).select('-password');
        if(!user) return res.status(404).json({message: "User not found"});

        let ownerRating = null;
        if (user.role === 'owner') {
            const store = await StoreModel.findOne({ ownerId: user._id });
            if (store) {
                const Rating = await RatingModel.find({ storeId: store._id });
                const avg = Rating.reduce((acc, curr) => acc + curr.rating, 0) / (Rating.length || 1); 
                ownerRating = avg.toFixed(2);
            }
        }
        res.json({ ...user._doc, rating: ownerRating });
    }
    catch (error) {
        return res.status(500).json({message: error.message });
    }
}