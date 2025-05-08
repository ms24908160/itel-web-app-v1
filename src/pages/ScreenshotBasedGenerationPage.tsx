import React, { useState } from 'react';
import '../styles/global.css'; // Import global styles
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';

const ScreenshotBasedGenerationPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [testCases, setTestCases] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!file.type.startsWith('image/')) {
                setError('Invalid file type. Please upload an image.');
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to analyze the screenshot.');
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
                            <button className="btn btn-secondary" onClick={handleAnalyze}>
                                Retry
                            </button>
                        </div>
                    )}
                </section>
                <section className="my-4">
                    <h2>Generated Test Cases</h2>
                    {testCases.length > 0 ? (
                        <ul>
                            {testCases.map((testCase, index) => (
                                <li key={index}>{testCase}</li>
                            ))}
                        </ul>
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