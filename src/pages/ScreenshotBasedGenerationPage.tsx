import React, { useState } from 'react';
import '../styles/global.css'; // Import global styles
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Install react-bootstrap if not already installed

const ScreenshotBasedGenerationPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [testCases, setTestCases] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                setError('Invalid file type. Please upload a PNG or JPEG image.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size exceeds 5MB. Please upload a smaller image.');
                return;
            }
            setImage(file);
            setError('');
        }
    };

    // Analyze the uploaded screenshot
    const handleAnalyze = async () => {
        setError('');
        setTestCases([]);
        setLoading(true);

        if (!image) {
            setError('Please upload a screenshot.');
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
            setError('You must be logged in to analyze a screenshot.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image', image); // Append the image file to the form data

        try {
            const response = await fetch('http://localhost:5000/api/analyze-screenshot', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: formData,
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized. Please log in again.');
                } else if (response.status === 500) {
                    throw new Error('Server error. Please try again later.');
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to analyze the screenshot.');
                }
            }

            const data = await response.json();
            setTestCases(data.testCases || []);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while analyzing the screenshot.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Function to handle file download
    const downloadFile = (format: string) => {
        if (testCases.length === 0) {
            setError('No test cases available to download.');
            return;
        }

        let content = '';
        let mimeType = '';
        let fileExtension = '';

        switch (format) {
            case 'txt':
                content = testCases.join('\n');
                mimeType = 'text/plain';
                fileExtension = 'txt';
                break;
            case 'csv':
                content = testCases.map((testCase, index) => `${index + 1},${testCase}`).join('\n');
                mimeType = 'text/csv';
                fileExtension = 'csv';
                break;
            case 'json':
                content = JSON.stringify(testCases, null, 2);
                mimeType = 'application/json';
                fileExtension = 'json';
                break;
            case 'xml':
                content = `<testCases>${testCases.map(tc => `<testCase>${tc}</testCase>`).join('')}</testCases>`;
                mimeType = 'application/xml';
                fileExtension = 'xml';
                break;
            default:
                setError('Unsupported file format.');
                return;
        }

        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `test_cases.${fileExtension}`;
        link.click();
    };

    return (
        <div className="screenshot-based-generation-page">
            <header className="text-center my-4">
                <h1>Screenshot-Based Test Case Generation</h1>
                <p>Upload a screenshot to analyze the DOM structure and generate QA test cases.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Upload Screenshot</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-control my-2"
                        aria-label="Upload a screenshot for analysis"
                    />
                    {image && (
                        <div className="image-preview my-3 text-center">
                            <h3>Preview:</h3>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded Screenshot Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    border: '1px solid #ccc',
                                    display: 'block',
                                    margin: '0 auto', // Center the image horizontally
                                }}
                            />
                        </div>
                    )}
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleAnalyze}
                        disabled={loading}
                        aria-label="Analyze the uploaded screenshot"
                    >
                        {loading ? 'Analyzing...' : 'Analyze Screenshot'}
                    </button>
                    {error && (
                        <div className="mt-3">
                            <p className="text-danger">{error}</p>
                            <button
                                className="btn btn-secondary me-2"
                                onClick={handleAnalyze}
                            >
                                Retry
                            </button>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => {
                                    setImage(null);
                                    setError('');
                                    setTestCases([]);
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </section>
                <section className="my-4">
                    <h2>Generated Test Cases</h2>
                    {testCases.length > 0 ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Test Case</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testCases.map((testCase, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{testCase}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DropdownButton id="dropdown-download-button"
                                title="Download Test Cases"
                                className="btn btn-success mt-3">
                                <Dropdown.Item onClick={() => downloadFile('txt')}>Download as TXT</Dropdown.Item>
                                <Dropdown.Item onClick={() => downloadFile('csv')}>Download as CSV</Dropdown.Item>
                                <Dropdown.Item onClick={() => downloadFile('json')}>Download as JSON</Dropdown.Item>
                                <Dropdown.Item onClick={() => downloadFile('xml')}>Download as XML</Dropdown.Item>
                            </DropdownButton>
                        </>
                    ) : (
                        <p>{error ? error : 'No test cases generated. Please try with a different screenshot.'}</p>
                    )}
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(ScreenshotBasedGenerationPage);