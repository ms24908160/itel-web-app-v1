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
const xml2js = require('xml2js');

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
        res.status(403).json({ message: 'Invalid or expired token. Please Re Login ' });
    }
};

// Role-Based Access Control Middleware
const authorizeRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
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

//Routes 
// New Route: Screenshot Analysis (Protected)
const sharp = require('sharp');

app.post('/api/analyze-screenshot',
    authenticateToken,
    authorizeRole(['Engineer', 'Administrator']),
    upload.single('image'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No screenshot uploaded.' });
            }

            const filePath = path.join(__dirname, 'uploads', `${Date.now()}-${req.file.originalname}`);
            fs.writeFileSync(filePath, req.file.buffer);

            const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

            const uiElements = await analyzeImageForUIElements(filePath);

            const testCases = generateAdvancedTestCases(text, uiElements);

            fs.unlinkSync(filePath);

            res.status(200).json({ testCases });
        } catch (error) {
            console.error('Error analyzing screenshot:', error.message);
            res.status(500).json({ message: 'Failed to analyze the screenshot.' });
        }
    }
);

const analyzeImageForUIElements = async (filePath) => {
    const metadata = await sharp(filePath).metadata();
    const uiElements = [];

    if (metadata.width && metadata.height) {
        // Detect buttons
        uiElements.push({ type: 'button', text: 'Submit', position: { x: metadata.width / 2, y: metadata.height / 2 } });
        uiElements.push({ type: 'button', text: 'Cancel', position: { x: metadata.width / 3, y: metadata.height / 3 } });

        // Detect input fields
        uiElements.push({ type: 'input', placeholder: 'Enter your email', position: { x: metadata.width / 4, y: metadata.height / 4 } });
        uiElements.push({ type: 'input', placeholder: 'Enter your password', position: { x: metadata.width / 5, y: metadata.height / 5 } });

        // Detect checkboxes
        uiElements.push({ type: 'checkbox', label: 'I agree to the terms', position: { x: metadata.width / 6, y: metadata.height / 6 } });

        // Detect dropdown menus
        uiElements.push({ type: 'dropdown', options: ['Option 1', 'Option 2'], position: { x: metadata.width / 7, y: metadata.height / 7 } });

        // Detect links
        uiElements.push({ type: 'link', text: 'Forgot Password?', href: '#', position: { x: metadata.width / 8, y: metadata.height / 8 } });

        // Detect images
        uiElements.push({ type: 'image', alt: 'Company Logo', position: { x: metadata.width / 9, y: metadata.height / 9 } });

        // Detect forms
        uiElements.push({ type: 'form', id: 'loginForm', position: { x: metadata.width / 10, y: metadata.height / 10 } });
    }

    return uiElements;
};

const generateAdvancedTestCases = (text, uiElements) => {
    const testCases = [];

    // Generate test cases from extracted text
    if (text.includes('login')) testCases.push('Verify login functionality.');
    if (text.includes('error')) testCases.push('Verify that error messages are displayed correctly.');
    if (text.includes('submit')) testCases.push('Verify that the submit button triggers the correct action.');

    // Generate test cases from detected UI elements
    uiElements.forEach((element) => {
        switch (element.type) {
            case 'button':
                testCases.push(`Verify the "${element.text}" button is clickable and performs the expected action.`);
                testCases.push(`Verify that the "${element.text}" button changes appearance when hovered over.`);
                break;

            case 'input':
                testCases.push(`Verify the input field with placeholder "${element.placeholder}" accepts valid input.`);
                testCases.push(`Verify that the input field with placeholder "${element.placeholder}" displays an error for invalid input.`);
                break;

            case 'checkbox':
                testCases.push(`Verify that the checkbox labeled "${element.label}" can be checked and unchecked.`);
                testCases.push(`Verify that the checkbox labeled "${element.label}" is required before form submission.`);
                break;

            case 'dropdown':
                testCases.push(`Verify that the dropdown menu with options "${element.options.join(', ')}" allows selection.`);
                testCases.push(`Verify that the dropdown menu closes when an option is selected.`);
                break;

            case 'link':
                testCases.push(`Verify that the link labeled "${element.text}" redirects to the correct page.`);
                testCases.push(`Verify that the link labeled "${element.text}" opens in a new tab (if applicable).`);
                break;

            case 'image':
                testCases.push(`Verify that the image with alt text "${element.alt}" loads correctly.`);
                testCases.push(`Verify that the image with alt text "${element.alt}" is responsive and adapts to different screen sizes.`);
                break;

            case 'form':
                testCases.push(`Verify that the form with ID "${element.id}" has a submit button.`);
                testCases.push(`Verify that the form with ID "${element.id}" validates all required fields before submission.`);
                break;

            default:
                testCases.push(`Verify that the detected UI element of type "${element.type}" functions as expected.`);
                break;
        }
    });

    // Accessibility checks
    testCases.push('Verify that all UI elements are accessible via keyboard navigation.');
    testCases.push('Verify that the page uses ARIA roles for accessibility.');
    testCases.push('Verify that all images have meaningful alt attributes for screen readers.');

    // Responsive design checks
    testCases.push('Verify that the layout is responsive and adapts to different screen sizes.');
    testCases.push('Verify that the page maintains proper alignment and spacing across all devices.');

    // Advanced checks
    testCases.push('Verify that the page includes a viewport meta tag for responsive design.');
    testCases.push('Verify that all forms have proper validation attributes.');
    testCases.push('Verify that all links have valid href attributes and do not lead to broken pages.');

    return testCases;
};

// Route to save the test set as an XML file
app.post('/api/save-test-set', authenticateToken, async (req, res) => {
    const { testCases, pageTag } = req.body;

    if (!testCases || testCases.length === 0) {
        return res.status(400).json({ message: 'No test cases provided.' });
    }

    if (!pageTag) {
        return res.status(400).json({ message: 'Page tag is required.' });
    }

    try {
        const userId = req.user.id; // Get the user's ID from the token
        const userRole = req.user.role; // Get the user's role from the token
        const baseFileName = `${userId}_${userRole}_${pageTag}`; // Base file name with pageTag
        const uploadsDir = path.join(__dirname, 'uploads');

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        // Check for existing files with the same base name
        const existingFiles = fs.readdirSync(uploadsDir).filter((file) => file.startsWith(baseFileName));
        let fileNumber = 0;

        if (existingFiles.length > 0) {
            // Extract the highest number from existing files
            const numbers = existingFiles.map((file) => {
                const match = file.match(new RegExp(`${baseFileName}_(\\d+)\\.xml`));
                return match ? parseInt(match[1], 10) : 0;
            });
            fileNumber = Math.max(...numbers) + 1; // Increment the highest number by 1
        }

        const fileName = `${baseFileName}_${fileNumber}.xml`; // Final file name
        const filePath = path.join(uploadsDir, fileName);

        // Create the XML content
        const builder = new xml2js.Builder();
        const xmlContent = builder.buildObject({
            testSet: {
                id: `${userId}_${userRole}_${pageTag}_${fileNumber}`,
                userId,
                userRole,
                pageTag,
                testCases: testCases.map((testCase) => ({
                    testCase: {
                        description: testCase.testCase,
                        category: testCase.category,
                        type: testCase.type,
                    },
                })),
            },
        });

        // Save the XML file
        fs.writeFileSync(filePath, xmlContent);

        res.status(200).json({ message: 'Test set saved successfully.', fileName });
    } catch (error) {
        console.error('Error saving test set:', error.message);
        res.status(500).json({ message: 'Failed to save test set.' });
    }
});

app.get('/api/get-user-files', authenticateToken, (req, res) => {
    const userId = req.user.id; // Extract user ID from the token
    const userRole = req.user.role; // Extract user role from the token
    const pageTag = req.query.pageTag; // Extract pageTag from query parameters (optional)
    const uploadsDir = path.join(__dirname, 'uploads');

    try {
        // Filter files based on userId, userRole, and optional pageTag
        const files = fs.readdirSync(uploadsDir).filter((file) => {
            const regex = pageTag
                ? new RegExp(`^${userId}_${userRole}_${pageTag}_(\\d+)\\.xml$`) // Match with pageTag
                : new RegExp(`^${userId}_${userRole}_(\\w+?)_(\\d+)\\.xml$`); // Match without pageTag
            return regex.test(file);
        });

        // Sort files by the file number in descending order
        const sortedFiles = files.sort((a, b) => {
            const aMatch = a.match(/_(\d+)\.xml$/);
            const bMatch = b.match(/_(\d+)\.xml$/);
            const aNumber = aMatch ? parseInt(aMatch[1], 10) : 0;
            const bNumber = bMatch ? parseInt(bMatch[1], 10) : 0;
            return bNumber - aNumber; // Sort in descending order
        });

        res.status(200).json({ userId, userRole, files: sortedFiles });
    } catch (error) {
        console.error('Error fetching user files:', error.message);
        res.status(500).json({ message: 'Failed to fetch user files.' });
    }
});

app.get('/api/get-file-content', authenticateToken, (req, res) => {
    const { fileName } = req.query; // Extract fileName from query parameters
    const uploadsDir = path.join(__dirname, 'uploads');
    const filePath = path.join(uploadsDir, fileName);

    try {
        // Validate the fileName parameter
        if (!fileName) {
            return res.status(400).json({ message: 'File name is required.' });
        }

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found.' });
        }

        // Read the file content
        const content = fs.readFileSync(filePath, 'utf-8');

        // Determine the file format (JSON or XML)
        if (fileName.endsWith('.json')) {
            // Parse and return JSON content
            try {
                const parsedContent = JSON.parse(content);
                return res.status(200).json({ content: parsedContent });
            } catch (parseError) {
                console.error('Error parsing JSON content:', parseError.message);
                return res.status(500).json({ message: 'Failed to parse JSON content.' });
            }
        } else if (fileName.endsWith('.xml')) {
            // Parse and return XML content as JSON
            const parser = new xml2js.Parser();
            parser.parseString(content, (err, result) => {
                if (err) {
                    console.error('Error parsing XML content:', err.message);
                    return res.status(500).json({ message: 'Failed to parse XML content.' });
                }

                // Extract test cases from the parsed XML structure
                const testCases = result?.testSet?.testCases?.map((testCase) => ({
                    description: testCase.testCase[0]?.description[0] || '',
                    category: testCase.testCase[0]?.category[0] || '',
                    type: testCase.testCase[0]?.type[0] || '',
                })) || [];

                return res.status(200).json({ content: testCases });
            });
        } else {
            // Unsupported file format
            return res.status(400).json({ message: 'Unsupported file format. Only JSON and XML are supported.' });
        }
    } catch (error) {
        console.error('Error fetching file content:', error.message);
        res.status(500).json({ message: 'Failed to fetch file content.' });
    }
});
app.post('/api/save-file-content', authenticateToken, (req, res) => {
    const { fileName, content } = req.body; // Extract fileName and content from the request body
    const uploadsDir = path.join(__dirname, 'uploads');
    const filePath = path.join(uploadsDir, fileName);

    try {
        // Validate the fileName and content
        if (!fileName || !content) {
            return res.status(400).json({ message: 'File name and content are required.' });
        }

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'File not found.' });
        }

        // Save the updated content to the file
        if (fileName.endsWith('.json')) {
            // Save as JSON
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
        } else if (fileName.endsWith('.xml')) {
            // Save as XML
            const builder = new (require('xml2js').Builder)();
            const xmlContent = builder.buildObject(content);
            fs.writeFileSync(filePath, xmlContent, 'utf-8');
        } else {
            return res.status(400).json({ message: 'Unsupported file format. Only JSON and XML are supported.' });
        }

        res.status(200).json({ message: 'File content saved successfully.', content });
    } catch (error) {
        console.error('Error saving file content:', error.message);
        res.status(500).json({ message: 'Failed to save file content.' });
    }
});


// Sign-In Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await pool.query('SELECT id, email, password, role FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a new JWT with user_id
        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email, role: user.rows[0].role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Update the token in the database
        await pool.query('UPDATE users SET token = $1 WHERE email = $2', [token, email]);

        res.status(200).json({ message: 'Login successful', role: user.rows[0].role, token });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// URL Analysis Route (Protected)


app.post('/api/analyze-url',
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
            } else {
                testCases.push('Verify that the page displays an error if the title element is missing.');
            }
            if (document.querySelector('meta[name="description"]')) {
                testCases.push('Verify that the page has a meta description.');
            } else {
                testCases.push('Verify that the page displays an error if the meta description is missing.');
            }
            if (document.querySelector('h1')) {
                testCases.push('Verify that the page has at least one H1 element.');
            } else {
                testCases.push('Verify that the page displays an error if no H1 element is present.');
            }
            // Check for links
            const links = document.querySelectorAll('a');
            if (links.length > 0) {
                testCases.push('Verify that the page has links.');
                testCases.push('Verify that all links have valid href attributes.');
                const brokenLinks = Array.from(links).filter(link => !link.href || link.href === '#');
                if (brokenLinks.length > 0) {
                    testCases.push('Verify that there are no broken links on the page.');
                }
            } else {
                testCases.push('Verify that the page displays an error if no links are present.');
            }
            // Check for images
            const images = document.querySelectorAll('img');
            if (images.length > 0) {
                testCases.push('Verify that the page has images.');
                testCases.push('Verify that all images have alt attributes.');
                const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
                if (imagesWithoutAlt.length > 0) {
                    testCases.push('Verify that all images have meaningful alt attributes.');

                    // Perform OCR on images without alt attributes
                    for (const img of imagesWithoutAlt) {
                        const imageUrl = img.src;
                        try {
                            const { data: { text } } = await Tesseract.recognize(imageUrl, 'eng');
                            testCases.push(`Verify that the image with text "${text}" is displayed correctly.`);
                        } catch (ocrError) {
                            console.error(`Error performing OCR on image: ${imageUrl}`, ocrError.message);
                        }
                    }
                }
            } else {
                testCases.push('Verify that the page displays an error if no images are present.');
            }
            // Check for forms
            const forms = document.querySelectorAll('form');
            if (forms.length > 0) {
                testCases.push('Verify that the page has forms.');
                testCases.push('Verify that all forms have a submit button.');
                testCases.push('Verify that all forms have proper validation attributes.');
                const formsWithoutSubmit = Array.from(forms).filter(form => !form.querySelector('button[type="submit"], input[type="submit"]'));
                if (formsWithoutSubmit.length > 0) {
                    testCases.push('Verify that all forms have a submit button.');
                }
            } else {
                testCases.push('Verify that the page displays an error if no forms are present.');
            }
            // Check for buttons
            const buttons = document.querySelectorAll('button');
            if (buttons.length > 0) {
                testCases.push('Verify that the page has buttons.');
                testCases.push('Verify that all buttons have accessible labels.');
            } else {
                testCases.push('Verify that the page displays an error if no buttons are present.');
            }
            // Check for input fields
            const inputs = document.querySelectorAll('input');
            if (inputs.length > 0) {
                testCases.push('Verify that the page has input fields.');
                testCases.push('Verify that all input fields have associated labels.');
                const inputsWithoutLabels = Array.from(inputs).filter(input => {
                    const id = input.id;
                    return !id || !document.querySelector(`label[for="${id}"]`);
                });
                if (inputsWithoutLabels.length > 0) {
                    testCases.push('Verify that all input fields have associated labels.');
                }
            } else {
                testCases.push('Verify that the page displays an error if no input fields are present.');
            }

            // Advanced checks
            // Check for accessibility features
            if (document.querySelector('[role]')) {
                testCases.push('Verify that the page uses ARIA roles for accessibility.');
            } else {
                testCases.push('Verify that the page displays an error if ARIA roles are missing.');
            }

            // Check for responsive design
            if (document.querySelector('meta[name="viewport"]')) {
                testCases.push('Verify that the page has a viewport meta tag for responsive design.');
            } else {
                testCases.push('Verify that the page displays an error if the viewport meta tag is missing.');
            }

            // Check for structured data
            if (document.querySelector('script[type="application/ld+json"]')) {
                testCases.push('Verify that the page includes structured data for SEO.');
            } else {
                testCases.push('Verify that the page displays an error if structured data is missing.');
            }
            // Return the generated test cases
            res.json({ testCases });
        } catch (error) {
            console.error('Error analyzing URL:', error.message);
            res.status(500).json({ message: 'Failed to analyze the URL.' });
        }
    }
);

// New Route: Test Case Classification
app.post('/api/classify-test-cases', upload.single('file'), async (req, res) => {
    try {
        let testCases = [];

        // Handle file upload
        if (req.file) {
            const filePath = path.join(__dirname, req.file.path);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            testCases = fileContent.split(/\r?\n/).filter((line) => line.trim() !== '');
            fs.unlinkSync(filePath); // Delete the file after processing
        }

        // Handle manual input
        if (req.body.testCases) {
            testCases = req.body.testCases.split(/\r?\n/).filter((line) => line.trim() !== '');
        }

        if (testCases.length === 0) {
            return res.status(400).json({ message: 'No test cases provided.' });
        }

        // Advanced classification logic
        const classifiedTestCases = testCases.map((testCase) => {
            const lowerCaseTestCase = testCase.toLowerCase();

            // Determine category
            const isFunctional = lowerCaseTestCase.includes('functional') || 
                                 lowerCaseTestCase.includes('login') || 
                                 lowerCaseTestCase.includes('submit') || 
                                 lowerCaseTestCase.includes('form');
            const isNonFunctional = lowerCaseTestCase.includes('performance') || 
                                    lowerCaseTestCase.includes('load') || 
                                    lowerCaseTestCase.includes('stress') || 
                                    lowerCaseTestCase.includes('security');

            const category = isFunctional ? 'Functional' : isNonFunctional ? 'Non-Functional' : 'Uncategorized';

            // Determine type
            const isPositive = !lowerCaseTestCase.includes('fail') && 
                               !lowerCaseTestCase.includes('error') && 
                               !lowerCaseTestCase.includes('invalid');
            const isNegative = lowerCaseTestCase.includes('fail') || 
                               lowerCaseTestCase.includes('error') || 
                               lowerCaseTestCase.includes('invalid');

            const type = isPositive ? 'Positive' : isNegative ? 'Negative' : 'Neutral';

            // Determine priority
            const isHighPriority = lowerCaseTestCase.includes('critical') || 
                                   lowerCaseTestCase.includes('high') || 
                                   lowerCaseTestCase.includes('must');
            const isMediumPriority = lowerCaseTestCase.includes('medium') || 
                                     lowerCaseTestCase.includes('should');
            const isLowPriority = lowerCaseTestCase.includes('low') || 
                                  lowerCaseTestCase.includes('optional');

            const priority = isHighPriority ? 'High' : isMediumPriority ? 'Medium' : isLowPriority ? 'Low' : 'Unspecified';

            return {
                testCase,
                category,
                type,
                priority,
            };
        });

        res.status(200).json({ classifiedTestCases });
    } catch (error) {
        console.error('Error classifying test cases:', error.message);
        res.status(500).json({ message: 'Failed to classify test cases.' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});