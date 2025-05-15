import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
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
})

UserSchema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
