const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  // category: {
  //   type: String,
  //   default: 'general',
  // },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
