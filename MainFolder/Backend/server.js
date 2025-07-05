const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
require('./passport');

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

app.use(passport.initialize());
app.use(passport.session());

// normal
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email']})
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    console.log("Google login success, user:", req.user); 

    if (!req.user) {
      return res.status(401).send("Google login failed or no user.");
    }

    const token = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("Generated token:", token); 

    res.redirect(`http://localhost:5173/google-redirect?token=${token}`);
  }
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
