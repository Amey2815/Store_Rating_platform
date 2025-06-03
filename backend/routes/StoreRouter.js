import express from 'express';
import { authorize, protect } from '../middlewares/authMiddleware.js';
import { addRating, addStore, getStoreDetails, getStoreOwner } from '../controllers/StoreController.js';




const StoreRouter = express.Router();

StoreRouter.post('/add', protect, authorize('admin','owner'), addStore);

StoreRouter.get('/details', protect, authorize('user'), getStoreDetails);
StoreRouter.post('/:storeId', protect, authorize('user'), addRating);

StoreRouter.get('/owner/mystore', protect, authorize('owner'), getStoreOwner);


export default StoreRouter;