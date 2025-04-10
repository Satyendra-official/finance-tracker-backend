// models/Account.js
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to 'User' model, not the ObjectId itself
    required: false,
  },
  name: {
    type: String, // salary account, expense account, etc.
    required: true,
  },
  type: {
    type: String,
    enum: ['savings', 'current'],
    required: true,
  },
  category: {
    type: String,
    enum: ['personal', 'work'],
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  setAsDefault: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Account', accountSchema);
