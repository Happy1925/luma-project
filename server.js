const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Credentials stored securely on backend (never exposed to frontend)
const VALID_CREDENTIALS = {
  username: "Rhythm",
  password: "1926"
};

// Authentication endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password required" });
  }

  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    // In production, generate a secure token (JWT)
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password" });
  }
});

app.listen(PORT, () => {
  console.log(`LUMA server running at http://localhost:${PORT}`);
});
