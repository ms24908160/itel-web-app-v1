// filepath: backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const SECRET_KEY = 'your_jwt_secret_key';
const users = []; // Dummy database

// Sign-Up Route
router.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, email, password: hashedPassword, role };
    users.push(newUser);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, SECRET_KEY, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        maxAge: 3600000,
    });

    res.status(201).json({ message: 'User registered successfully', role: newUser.role });
});

module.exports = router;