const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

router.get('/:recipient', authMiddleware, async (req, res) => {
  const { username } = req.user;
  const { recipient } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: username, recipient },
        { sender: recipient, recipient: username }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
