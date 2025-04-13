// routes/transactionRoutes.js
import express from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  getRecurringTransactions,
} from '../controllers/transactionController.js';

const router = express.Router();

// POST /api/transactions - create transaction
// Accepts accountId OR category (if accountId not provided)
router.post('/', createTransaction);

// GET /api/transactions - fetch all transactions
router.get('/', getTransactions);

// GET /api/transactions/:id - fetch a single transaction
router.get('/:id', getTransactionById);

//GET /api/transactions/recurring?interval=daily - to fetch recurring transactions
router.get('/recurring', getRecurringTransactions);


// DELETE /api/transactions/:id - delete a transaction and adjust balance
router.delete('/:id', deleteTransaction);

export default router;
