const express = require('express');
const router = express.Router();
const User = require('./User');
require('dotenv').config();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin
    if (
      email === process.env.OWNER_EMAIL &&
      password === process.env.OWNER_PASSWORD
    ) {
      return res.json({ role: 'owner' });
    }

    // Check normal user
    const user = await User.findOne({ email, password });
    if (user) {
      return res.json({ role: 'user', user });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
