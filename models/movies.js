/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  streamingApp: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

export default mongoose.model('Movies', movieSchema);
