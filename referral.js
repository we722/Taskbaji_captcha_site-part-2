const express = require('express');
const router = express.Router();
const User = require('./User');

// Route: POST /referral
router.post('/referral', async (req, res) => {
  const { referredByEmail } = req.body;

  try {
    if (referredByEmail) {
      const referrer = await User.findOne({ email: referredByEmail });
      if (referrer) {
        referrer.points += 5; // রেফারার ৫ পয়েন্ট পাবেন
        await referrer.save();
        return res.json({ message: 'Referral bonus added to referrer.' });
      }
    }
    res.status(404).json({ message: 'Referrer not found or not provided.' });
  } catch (err) {
    console.error('Referral error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
