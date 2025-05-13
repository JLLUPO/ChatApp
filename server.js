require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
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


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

const onlineUsers = {}; // username => socket.id
// Socket.IO chat
io.on('connection', async (socket) => {
  console.log('User connected', socket.id);

  socket.on('init-session', (username) => {
    socket.username = username;
    onlineUsers[username] = socket.id;
  });


  // On new message
  socket.on('direct message', async (msg) => {
    const { from, to, text } = msg;

    const savedMessage = await Message.create({ sender: from, recipient: to, text });

    // Save message to DB
    // try {
    //   const savedMessage = await Message.create({ sender: from, recipient: to, text });
    //   // io.emit('direct message', savedMessage); // Broadcast saved msg
    // } catch (err) {
    //   console.error('Error saving message:', err);
    // }

    const recipientSocketId = onlineUsers[to];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('direct message', savedMessage);
    }

    socket.emit('direct message', savedMessage);
  }); 

  

  socket.on('disconnect', () => {
    if (socket.username) {
      delete onlineUsers[socket.username];
    }
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
