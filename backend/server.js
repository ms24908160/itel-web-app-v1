const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios'); // For fetching HTML content
const { JSDOM } = require('jsdom'); // For DOM parsing
const multer = require('multer'); // For handling file uploads
const Tesseract = require('tesseract.js'); // OCR library
const jwt = require('jsonwebtoken'); // For JWT authentication
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000; // Backend server port
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

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

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach decoded token data to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

// Role-Based Access Control Middleware
const authorizeRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
};

// New Route: Screenshot Analysis (Protected)
app.post(
    '/api/analyze-screenshot',
    authenticateToken,
    authorizeRole(['Engineer', 'Administrator']),
    upload.single('image'),
    async (req, res) => {
        try {
            // Check if a file is uploaded
            if (!req.file) {
                return res.status(400).json({ message: 'No screenshot uploaded.' });
            }

            // Save the uploaded file temporarily
            const filePath = path.join(__dirname, 'uploads', `${Date.now()}-${req.file.originalname}`);
            fs.writeFileSync(filePath, req.file.buffer);

            // Perform OCR using Tesseract.js
            const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

            // Process the extracted text to generate test cases
            const testCases = generateTestCasesFromScreenshotText(text);

            // Delete the uploaded file after processing
            fs.unlinkSync(filePath);

            // Return the generated test cases
            res.status(200).json({ testCases });
        } catch (error) {
            console.error('Error analyzing screenshot:', error.message);
            res.status(500).json({ message: 'Failed to analyze the screenshot.' });
        }
    }
);

// Helper function to generate test cases from extracted text
const generateTestCasesFromScreenshotText = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const testCases = [];

    lines.forEach((line, index) => {
        testCases.push(`Test Case ${index + 1}: Verify the presence of "${line.trim()}" on the page.`);
    });

    return testCases;
};

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

        // Generate JWT
        const token = jwt.sign({ email, role }, SECRET_KEY, { expiresIn: '1h' });

        // Insert user into the database with the token
        await pool.query(
            'INSERT INTO users (email, password, role, token) VALUES ($1, $2, $3, $4)',
            [email, hashedPassword, role, token]
        );

        res.status(201).json({ message: 'User registered successfully', role, token });
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

        // Generate a new JWT
        const token = jwt.sign(
            { email: user.rows[0].email, role: user.rows[0].role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Update the token in the database
        await pool.query('UPDATE users SET token = $1 WHERE email = $2', [token, email]);

        res.status(200).json({ message: 'Login successful', role: user.rows[0].role, token });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// URL Analysis Route (Protected)
app.post(
    '/api/analyze-url',
    authenticateToken,
    authorizeRole(['Engineer', 'Administrator']),
    async (req, res) => {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: 'URL is required.' });
        }

        try {
            // Fetch the HTML content of the URL
            const response = await axios.get(url);
            const html = response.data;

            // Parse the HTML using JSDOM
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Generate test cases
            const testCases = [];

            // Check for the presence of key elements
            if (document.querySelector('title')) {
                testCases.push('Verify that the page has a title element.');
            }
            if (document.querySelector('meta[name="description"]')) {
                testCases.push('Verify that the page has a meta description.');
            }
            if (document.querySelector('h1')) {
                testCases.push('Verify that the page has at least one H1 element.');
            }
            if (document.querySelectorAll('a').length > 0) {
                testCases.push('Verify that the page has links.');
            }
            if (document.querySelectorAll('img').length > 0) {
                testCases.push('Verify that the page has images.');

                // Additional test case: Check for alt attributes in images
                const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(
                    (img) => !img.hasAttribute('alt')
                );
                if (imagesWithoutAlt.length > 0) {
                    testCases.push('Verify that all images have alt attributes.');
                }
            }

            // Check for forms
            if (document.querySelectorAll('form').length > 0) {
                testCases.push('Verify that the page has forms.');
            }

            // Check for buttons
            if (document.querySelectorAll('button').length > 0) {
                testCases.push('Verify that the page has buttons.');
            }

            // Check for input fields
            if (document.querySelectorAll('input').length > 0) {
                testCases.push('Verify that the page has input fields.');
            }

            // Return the generated test cases
            res.json({ testCases });
        } catch (error) {
            console.error('Error analyzing URL:', error.message);
            res.status(500).json({ message: 'Failed to analyze the URL.' });
        }
    }
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});