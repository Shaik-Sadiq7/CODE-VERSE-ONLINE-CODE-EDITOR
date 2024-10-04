// Import necessary modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing (optional)
const User = require('../models/User'); // Adjust path as per your model location

// Login endpoint
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'Login failed. Please check your credentials.' });
    }

    // Compare passwords (assuming you've hashed passwords during signup)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Incorrect password for user:', email);
      return res.status(401).json({ message: 'Login failed. Please check your credentials.' });
    }

    // Successful login
    console.log('Login successful for user:', email);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
