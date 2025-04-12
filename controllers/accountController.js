// controllers/accountController.js
import Account from '../models/Account.js';

// Create a new account
export const createAccount = async (req, res) => {
  try {
    const { name, type, balance, setAsDefault, userId } = req.body;
    
    console.log(userId)
    if (setAsDefault) {
      // Unset existing default account for the same user
      await Account.updateMany(
        { userId, setAsDefault: true },
        { $set: { setAsDefault: false } }
      );
    }

    const account = new Account({ name, type, balance, setAsDefault, userId });
    const savedAccount = await account.save();

    res.status(201).json(savedAccount);
  } catch (err) {
    // Handle duplicate key error for 'name'
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ message: 'Account name already exists' });
    }

    res.status(500).json({ error: err.message });
  }
};

// Get all accounts
export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    // console.log(accounts)
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single account
export const getAccountById = async (req, res) => {
  try {
    const {id:_id} = req.params
    const account = await Account.findById(id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { setAsDefault, ...rest } = req.body;

    // 1. Check if the account exists
    const account = await Account.findById(id);
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const userId = account.userId;
    let updatedAccount = account;

    // 2. If setAsDefault is true, unset others and set this one as default in a single DB call
    if (setAsDefault === true) {
      await Account.bulkWrite([
        {
          updateMany: {
            filter: { userId, _id: { $ne: id } },
            update: { $set: { setAsDefault: false } }
          }
        },
        {
          updateOne: {
            filter: { _id: id, userId },
            update: { $set: { setAsDefault: true } }
          }
        }
      ]);
      updatedAccount.setAsDefault = true
    }

   
    const hasOtherFields = Object.keys(rest).length > 0;

    if (hasOtherFields || (setAsDefault !== undefined && setAsDefault !== true)) {
      const updatePayload = { ...rest };

      // Only set setAsDefault in this update if it's not already handled by bulkWrite
      if (setAsDefault !== undefined && setAsDefault !== true) {
        updatePayload.setAsDefault = setAsDefault;
      }

      updatedAccount = await Account.findByIdAndUpdate(
        id,
        { $set: updatePayload },
        { new: true }
      );
    }

    return res.status(200).json({
      success : true,
      message: "Account updated successfully",
      updatedAccount
    });

  } catch (err) {
    console.error("Update account error:", err);
    return res.status(500).json({ error: err.message });
  }
};



// Delete an account
export const deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
