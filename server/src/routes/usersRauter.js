const express = require('express');
const db = require('../controllers/users.controller');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const router = express.Router();

// POST endpoint to authenticate user
router.post('/login', async (req, res) => {
  try {
    const { username, website } = req.body;
    if (!username || !website) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const connection = await pool.getConnection();

    const [rows] = await db.getUserToLogin(username);
    try {
      const isMatch = await bcrypt.compare(plaintextPassword, rows[0].password_hash);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error;
    }

    connection.release();

    if (rows.length === 1 && isMatch) {
      // User found, return user data
      res.json(rows[0]);
    } else {
      // User not found
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Failed to authenticate user' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { username, website } = req.body;
    if (!username || !website) {
      return res.status(400).json({ error: 'Username and website (password) are required' });
    }

    const connection = await pool.getConnection();
    const [existingUser] = await db.getUser(username);

    if (existingUser.length === 0) {
      // User doesn't exist, proceed with signup
      await db.addNewUser(username, website);
      connection.release();

      // Return success response
      res.status(201).json({ message: 'User created successfully' });
    } else {
      // User already exists
      res.status(409).json({ error: 'User already exists' });
    }
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Failed to sign up user' });
  }
});

module.exports = router;
