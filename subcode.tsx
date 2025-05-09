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