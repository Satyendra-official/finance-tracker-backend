const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "67f63e5f3ec9e5346ac6e5d3", // 'User'
    required: false,
  },
  name: {
    type: String, // salary account, Expence account, 
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

module.exports = mongoose.model('Account', accountSchema);

