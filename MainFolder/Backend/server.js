const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config(); // Keep only one instance
require('./passport');
const pool = require('./db'); 
const userRoutes = require('./routes/users');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes")
const savedJobs = require("./routes/savedJobs")


const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/employers', require('./routes/employers'));
app.use('/api/applications', applicationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/saved-jobs", savedJobs)

app.use(passport.initialize());
app.use(passport.session());


// Normal routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



// WebSocket (Socket.io) setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // Listen for 'send_message' event from clients
  socket.on('send_message', async (data) => {
    const { sender_id, receiver_id, content } = data;

    // Insert message into DB (you can customize this)
    try {
      await pool.query(
        `INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)`,
        [sender_id, receiver_id, content]
      );

      // Emit the message to both parties
      io.emit('receive_message', data);
    } catch (err) {
      console.error('Error in sending message:', err.message);
      socket.emit('message_error', 'Server error while sending message');
    }
  });

  // Listen for disconnect events
  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
