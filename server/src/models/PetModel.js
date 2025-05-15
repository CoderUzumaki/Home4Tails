import mongoose from "mongoose";

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["dog", "cat", "other"],
        required: true
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },
    bio: {
        type: String,
        default: "",
        required: true
    },
    photos: [{
        type: String,
    }],
    location: {
        type: String,
        required: true
    },
    isAdopted: {
        type: Boolean,
        default: false
    },
    personalityTraits: [{
        type: String,
        enum: [
            "Friendly and outgoing",
            "Energetic and playful",
            "Intelligent and trainable",
            "Loyal and protective"
        ]
    }],
    healthInfo: {
        vaccinated: { type: Boolean, default: false },
        neutered: { type: Boolean, default: false },
        microchipped: { type: Boolean, default: false },
        specialNeeds: { type: Boolean, default: false }
    },
    idealHome: [{
        type: String,
        enum: [
            "Active household",
            "Home with a yard",
            "Experienced dog owners",
            "Not suitable for homes with cats"
        ]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
});

export default mongoose.model("Pet", PetSchema);
