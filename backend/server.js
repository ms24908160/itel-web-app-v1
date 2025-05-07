// filepath: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_jwt_secret_key';

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust origin for your frontend
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/itel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy database
const users = [];

// Routes
app.use('/api/auth', require('./routes/auth'));

// Sign-Up Route
app.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const newUser = { id: users.length + 1, email, password: hashedPassword, role };
    users.push(newUser);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, SECRET_KEY, {
        expiresIn: '1h',
    });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: 'Strict',
        maxAge: 3600000, // 1 hour
    });

    res.status(201).json({ message: 'User registered successfully', role: newUser.role });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});