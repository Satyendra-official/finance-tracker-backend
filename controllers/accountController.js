const Account = require('../models/Account');

// Create a new account
// exports.createAccount = async (req, res) => {
//   try {
//     const account = new Account(req.body);
//     const savedAccount = await account.save();
//     res.status(201).json(savedAccount);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


exports.createAccount = async (req, res) => {
  try {
    const { name, category, type, balance, setAsDefault, userId } = req.body;

    if (setAsDefault) {
      // Unset existing default account for the same user
      await Account.updateMany(
        { userId, setAsDefault: true },
        { $set: { setAsDefault: false } }
      );
    }

    const account = new Account({ name, category, type, balance, setAsDefault, userId });
    const savedAccount = await account.save();

    res.status(201).json(savedAccount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all accounts
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single account
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ message: 'Account not found' });
    res.status(200).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an account
// Update account is called every time the setAsDefault is set to be true to which ever accout it is a put request

exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { setAsDefault, userId, ...rest } = req.body;

    // If the updated account should be the default one
    if (setAsDefault) {
      // Unset previous default account for this user
      await Account.updateMany(
        { userId, setAsDefault: true, _id: { $ne: id } },
        { $set: { setAsDefault: false } }
      );
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      {
        $set: {
          ...rest,
          ...(setAsDefault !== undefined && { setAsDefault }), // only update if it's provided
        },
      },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.updateAccount = async (req, res) => {
//   try {
//     const updated = await Account.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
