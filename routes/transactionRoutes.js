// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
} = require('../controllers/transactionController');

// POST /api/transactions - create transaction
// Accepts accountId OR category (if accountId not provided)
router.post('/', createTransaction);

// GET /api/transactions - fetch all transactions
router.get('/', getTransactions);

// GET /api/transactions/:id - fetch a single transaction
router.get('/:id', getTransactionById);

// DELETE /api/transactions/:id - delete a transaction and adjust balance
router.delete('/:id', deleteTransaction);

module.exports = router;
