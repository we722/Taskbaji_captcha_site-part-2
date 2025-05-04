const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
  email: { type: String, required: true },
  method: { type: String, required: true }, // eg: UPI, Binance, FaucetPay
  wallet: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, approved, rejected
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Withdraw', withdrawSchema);
