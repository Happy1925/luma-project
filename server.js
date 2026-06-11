require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DEFAULT_USERNAME = 'Rhythm';
const DEFAULT_PASSWORD = '1926';

const VALID_USERNAME = process.env.API_USERNAME || DEFAULT_USERNAME;
const VALID_PASSWORD_HASH = process.env.API_PASSWORD_HASH || bcrypt.hashSync(DEFAULT_PASSWORD, 10);

// Authentication endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  const isUserValid = username === VALID_USERNAME;
  const isPasswordValid = bcrypt.compareSync(password, VALID_PASSWORD_HASH);

  if (isUserValid && isPasswordValid) {
    // In production, replace this with a secure token/session flow.
    return res.json({ success: true, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

app.listen(PORT, () => {
  console.log(`LUMA server running at http://localhost:${PORT}`);
});
