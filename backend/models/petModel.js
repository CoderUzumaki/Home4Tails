import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
    lowercase: true
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat'],
    lowercase: true,
    trim: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  adoptionStatus: {
    type: String,
    required: true,
    enum: ['available', 'pending', 'adopted'],
    default: 'available'
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

petSchema.index({
  name: 'text',
  type: 'text',
  breed: 'text',
  description: 'text'
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
