import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
}, {timestamps: true})

const User = mongoose.model('User', userSchema); 
//mongo automatically creates table with plural of this i.e. Users

export default User;