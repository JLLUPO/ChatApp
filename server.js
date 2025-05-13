require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chat');
const Message = require('./models/Message');


const app = express();
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: "*", // change in production
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client'));
app.use('/api/chat', chatRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api', require('./routes/auth'));

// Socket.IO chat
const users = new Map();

io.on('connection', async (socket) => {
  console.log('User connected', socket.id);

  socket.on('register-user', (username) => {
    users.set(username, socket.id);
    socket.username = username; // store on socket
    console.log(`User registered: ${username}`);
  })

  // Send chat history to new connection
  try {
    const history = await Message.find().sort({ timestamp: 1 }).limit(50);
    socket.emit('chat history', history);
  } catch (err) {
    console.error('Error fetching history:', err);
  }

  // On new message
  socket.on('chat message', async (msg) => {
    const messageData = {
      sender: msg.user,
      text: msg.text,
    };  

    // Save message to DB
    try {
      const savedMessage = await Message.create(messageData);
      io.emit('chat message', savedMessage); // Broadcast saved msg
    } catch (err) {
      console.error('Error saving message:', err);
    }
  }); 

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
