import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 60
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        required: true,
        maxlength: 400
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin' , 'owner'],
        default: 'user'
    }
},{timestamps: true});

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export default UserModel;