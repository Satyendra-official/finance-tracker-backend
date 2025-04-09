const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
