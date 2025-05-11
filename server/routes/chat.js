const express = require('express');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Example protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}, you are authenticated.` });
});

module.exports = router;