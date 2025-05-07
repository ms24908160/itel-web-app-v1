const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // Backend server port

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'itel_db',
    password: 'super1',
    port: 6666,
});

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Sign-Up Route
app.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, password, role) VALUES ($1, $2, $3)', [
            email,
            hashedPassword,
            role,
        ]);

        res.status(201).json({ message: 'User registered successfully', role });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Sign-In Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', role: user.rows[0].role });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Account Endpoint
app.get('/account', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await pool.query('SELECT email, role FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error('Error fetching account details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Logout Endpoint
app.post('/logout', (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'Strict' });
    res.json({ message: 'Logged out successfully' });
});

// Check User Endpoint (For Debugging)
app.get('/check-user', async (req, res) => {
    const { email } = req.query;

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User exists', user: user.rows[0] });
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});