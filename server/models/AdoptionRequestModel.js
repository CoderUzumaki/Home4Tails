import mongoose from "mongoose";

const AdoptionRequestSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled"],
    default: "pending"
  },
  preferredDate: {
    type: Date
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  reviewedByAdmin: {
    type: Boolean,
    default: false
  },
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
});

AdoptionRequestSchema.pre('save', function(next) {
  if (!this.status) {
    this.status = 'pending';
  }
  next();
});

export default mongoose.model("AdoptionRequest", AdoptionRequestSchema);
