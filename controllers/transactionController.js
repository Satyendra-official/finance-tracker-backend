// controllers/transactionController.js
import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';

// Create a transaction (income or expense)
export const createTransaction = async (req, res) => {
  try {
    let { accountId, type, amount, category } = req.body;

    // Step 1: Resolve accountId
    if (!accountId) {
      if (category) {
        // Try to find default account for the given category
        const defaultAccount = await Account.findOne({
          category: category,
          setAsDefault: true,
        });

        if (!defaultAccount) {
          return res.status(400).json({ message: `No default account found for category: ${category}` });
        }

        accountId = defaultAccount._id;
      } else {
        // No category provided, fallback to any default account
        const fallbackAccount = await Account.findOne({ setAsDefault: true });

        if (!fallbackAccount) {
          return res.status(400).json({ message: 'No default account available' });
        }

        accountId = fallbackAccount._id;
      }
    }

    // Step 2: Create transaction
    const transaction = new Transaction({
      ...req.body,
      accountId,
    });

    const savedTransaction = await transaction.save();

    // Step 3: Update account balance
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    account.balance += type === 'income' ? amount : -amount;
    await account.save();

    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('accountId');
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('accountId');
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a transaction and update account balance
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const account = await Account.findById(transaction.accountId);
    if (!account) return res.status(404).json({ message: 'Account not found' });

    // Reverse the balance change
    account.balance += transaction.type === 'income' ? -transaction.amount : transaction.amount;
    await account.save();

    await transaction.deleteOne();
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
