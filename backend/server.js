const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios'); // For fetching HTML content
const { JSDOM } = require('jsdom'); // For DOM parsing
const multer = require('multer'); // For handling file uploads
const Tesseract = require('tesseract.js'); // OCR library

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

// Multer setup for file uploads
const upload = multer({ storage: multer.memoryStorage() });

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

// URL Analysis Route
app.post('/api/analyze-url', async (req, res) => {
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
});

// Screenshot Analysis Route
app.post('/api/analyze-screenshot', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded.' });
    }

    try {
        // Perform OCR on the uploaded image
        const { data: { text } } = await Tesseract.recognize(req.file.buffer, 'eng');

        // Generate test cases based on the extracted text
        const testCases = [];
        if (text.includes('Login')) {
            testCases.push('Verify that the login functionality works as expected.');
        }
        if (text.includes('Submit')) {
            testCases.push('Verify that the submit button triggers the correct action.');
        }
        if (text.includes('Error')) {
            testCases.push('Verify that error messages are displayed correctly.');
        }

        // Add a generic test case if no specific keywords are found
        if (testCases.length === 0) {
            testCases.push('Verify that the UI elements are displayed correctly.');
        }

        res.json({ testCases });
    } catch (error) {
        console.error('Error analyzing screenshot:', error);
        res.status(500).json({ message: 'Failed to analyze the screenshot.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});