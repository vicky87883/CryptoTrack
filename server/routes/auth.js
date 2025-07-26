// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Verification email sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    await User.update({ isVerified: true }, { where: { id } });
    res.redirect('http://localhost:3000/login?verified=true');
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});
// Login
// routes/auth.js

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Please verify your email' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    // ✅ Send emailVerified field based on isVerified column
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});


// Get current session user
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});



module.exports = router;
