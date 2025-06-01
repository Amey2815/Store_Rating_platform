import StoreModel from "../models/StoreModel.js";
import RatingModel from "../models/RatingModel.js";


// admin user: add store
export const addStore = async (req, res) => {
    try {
        const { name, email, address, ownerId } = req.body;
        const store = await StoreModel.create({
            name,
            email,
            address,
            ownerId,
        });
        res.status(201).json({
            success: true,
            message: "Store created successfully",
            store
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// normal user: This function allows users to view the details of a store
export const getStoreDetails = async (req, res) => {
    const { name, address } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    try {
        const stores = await StoreModel.find(filter);
        const enriched = await Promise.all(stores.map(async (store) => {
            const ratings = await RatingModel.find({ storeId: store._id });
            const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / (ratings.length || 1);
            const userRatings = await RatingModel.find({ storeId: store._id, userId: req.user._id });
            return {
                ...store._doc,
                averageRating: averageRating.toFixed(2),
                userRatings: userRatings?.rating || null,
            };
        })
        );
        res.json({
            success: true,
            message: "Store details fetched successfully",
             enriched
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Normal user: This function allows users to add or update their rating for a store
export const addRating = async (req, res) => {
    try{
      const { rating } = req.body;
    const { storeId } = req.params;

    let userRating = await RatingModel.findOne({ userId: req.user._id, storeId });
    if (userRating) {
        userRating.rating = rating;
        await userRating.save();
    } else {
        userRating = await RatingModel.create({
            userId: req.user._id,
            storeId,
            rating
        });
    }
    res.status(201).json({
        success: true,
        message: "Rating added successfully",
        userRating
    });  
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

// store owner:
export const getStoreOwner = async (req, res) => {
    try{
        const store = await StoreModel.findOne({ownerId: req.user._id});
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const ratings = await RatingModel.find({ storeId: store._id }).populate('userId', 'name email');
        const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / (ratings.length || 1);

        res.json({
            store: store.name,
            averageRating: averageRating.toFixed(2),
            ratings: ratings.map(rating => ({
                user: rating.userId.name,
                email: rating.userId.email,
                rating: rating.rating
            }))
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}