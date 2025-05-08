import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file

const ScreenshotBasedGenerationPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [testCases, setTestCases] = useState<string[]>([]);
    const [error, setError] = useState('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setError('');
        }
    };

    const handleAnalyze = async () => {
        if (!image) {
            setError('Please upload a screenshot.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/analyze-screenshot', {
                method: 'POST',
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
        }
    };

    return (
        <div className="screenshot-based-generation-page">
            <header className="text-center my-4">
                <h1>Screenshot-Based Generation</h1>
                <p>Leverage OCR technology to convert screenshots into actionable test cases by mapping visual UI elements accurately.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Upload Screenshot</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="form-control my-2"
                    />
                    <button className="btn btn-primary mt-2" onClick={handleAnalyze}>
                        Analyze Screenshot
                    </button>
                    {error && <p className="text-danger mt-2">{error}</p>}
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
                        <p>No test cases generated yet.</p>
                    )}
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(ScreenshotBasedGenerationPage);