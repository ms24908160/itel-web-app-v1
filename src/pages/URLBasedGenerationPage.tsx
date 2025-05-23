import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Import React-Bootstrap components
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file

const URLBasedGenerationPage: React.FC = () => {
    const [url, setUrl] = useState('');
    const [testCases, setTestCases] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    // Check user role and redirect if unauthorized
    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (!token) {
            navigate('/signin-signup'); // Redirect to login if not logged in
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            setRole(decodedToken.role);

            if (decodedToken.role !== 'Engineer' && decodedToken.role !== 'Administrator' && decodedToken.role !== 'Observer') {
                alert('Access denied. Only Engineers and Administrators can access this page.');
                navigate('/'); // Redirect to home page or another appropriate page
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/signin-signup'); // Redirect to login if token is invalid
        }
    }, [navigate]);

    const handleAnalyze = async () => {
        setError('');
        setTestCases([]);

        if (!url) {
            setError('Please enter a valid URL.');
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
            setError('You must be logged in to analyze a URL.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/analyze-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to analyze the URL.');
            }

            const data = await response.json();
            setTestCases(data.testCases || []);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while analyzing the URL.');
            }
        }
    };

    // Export test cases in the selected format
    const exportTestCases = (format: string) => {
        if (testCases.length === 0) {
            alert('No test cases available to export.');
            return;
        }

        let content = '';
        let mimeType = '';
        let fileExtension = '';

        if (format === 'csv') {
            content = 'Test Case\n';
            content += testCases.join('\n');
            mimeType = 'text/csv';
            fileExtension = 'csv';
        } else if (format === 'txt') {
            content = testCases.join('\n');
            mimeType = 'text/plain';
            fileExtension = 'txt';
        } else if (format === 'json') {
            content = JSON.stringify(testCases, null, 2); // Pretty JSON format
            mimeType = 'application/json';
            fileExtension = 'json';
        } else if (format === 'xml') {
            content = '<?xml version="1.0" encoding="UTF-8"?>\n<testCases>\n';
            content += testCases.map((testCase) => `  <testCase>${testCase}</testCase>`).join('\n');
            content += '\n</testCases>';
            mimeType = 'application/xml';
            fileExtension = 'xml';
        }

        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `test-cases.${fileExtension}`;
        link.click();
        URL.revokeObjectURL(link.href); // Clean up the URL object
    };

    return (
        <div className="url-based-generation-page">
            <header className="text-center my-4">
                <h1>URL-Based Generation</h1>
                <p>Analyze your web application's structure to identify key UI elements and automatically create base test scenarios.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Enter URL</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the URL of the web page"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2" onClick={handleAnalyze}>
                            Analyze
                        </button>
                    </div>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </section>
                <section className="my-4">
                    <h2>Generated Test Cases</h2>
                    {testCases.length > 0 ? (
                        <>
                            <ul>
                                {testCases.map((testCase, index) => (
                                    <li key={index}>{testCase}</li>
                                ))}
                            </ul>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Export Test Cases"
                                className="mt-3"
                            >
                                <Dropdown.Item onClick={() => exportTestCases('csv')}>Export as CSV</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportTestCases('txt')}>Export as TXT</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportTestCases('json')}>Export as JSON</Dropdown.Item>
                                <Dropdown.Item onClick={() => exportTestCases('xml')}>Export as XML</Dropdown.Item>
                            </DropdownButton>
                        </>
                    ) : (
                        <p>No test cases generated yet.</p>
                    )}
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(URLBasedGenerationPage);