import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: {
            type: String,
            default: "India"
        }
    },
    role: {
        type: String,
        enum: ['user', 'volunteer', 'admin'],
        default: 'user'
    },
    adoptedPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    donations: [{
        amount: Number,
        date: { type: Date, default: Date.now }
    }],
    profilePicture: {
        type: String,
        default: 'default-avatar.png'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
