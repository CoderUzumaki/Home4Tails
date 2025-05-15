import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        default: "",
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "male"
    },
    avatar: {
        type: String,
        default: function() {
            if (this.gender === "female") {
                return "https://unsplash.com/illustrations/a-drawing-of-a-woman-with-long-black-hair-cx2saPh8nJY"; // Default female avatar
            } else {
                return "https://unsplash.com/illustrations/a-man-with-blonde-hair-and-a-green-shirt-E94jIKS0WK4"; // Default male avatar
            }
        }
    },
    role: {
        type: String,
        enum: ["user", "volunteer", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
    }],
    adoptedPets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
    }],
    donations: [{
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    )
};

userSchemsa.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    )
};

export default mongoose.model("User", UserSchema);
