import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Import Bootstrap components

const TestCaseClassificationPage: React.FC = () => {
    const [testCases, setTestCases] = useState<string[]>([]);
    const [classifiedTestCases, setClassifiedTestCases] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle file upload
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!file.name.endsWith('.txt') && !file.name.endsWith('.csv')) {
                setError('Invalid file type. Please upload a .txt or .csv file.');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/classify-test-cases', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to classify test cases.');
                }

                const data = await response.json();
                setClassifiedTestCases(data.classifiedTestCases || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle manual test case input
    const handleManualInput = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.target.value;
        if (!input.trim()) {
            setError('Please enter test cases.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/classify-test-cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testCases: input }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to classify test cases.');
            }

            const data = await response.json();
            setClassifiedTestCases(data.classifiedTestCases || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // Move test cases to ManagementPage
   const moveToManagementPage = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/save-test-set', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the user's token
            },
            body: JSON.stringify({
                testCases: classifiedTestCases,
                pageTag: 'TestCaseClassificationPage', // Tag to identify the source page
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save test set.');
        }

        const data = await response.json();
        const filePath = data.filePath; // Get the file path of the saved XML file

        // Redirect to ManagementPage with the file path
        window.location.href = `/management?filePath=${encodeURIComponent(filePath)}`;
    } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
};

    // Export test cases in the selected format
    const exportTestCases = (format: string) => {
        if (classifiedTestCases.length === 0) {
            setError('No test cases to export.');
            return;
        }

        let content = '';
        let mimeType = '';
        let fileExtension = '';

        if (format === 'csv') {
            content = 'Test Case,Category,Type\n';
            content += classifiedTestCases
                .map((item) => `${item.testCase},${item.category},${item.type}`)
                .join('\n');
            mimeType = 'text/csv';
            fileExtension = 'csv';
        } else if (format === 'txt') {
            content = classifiedTestCases
                .map((item) => `Test Case: ${item.testCase}\nCategory: ${item.category}\nType: ${item.type}\n`)
                .join('\n');
            mimeType = 'text/plain';
            fileExtension = 'txt';
        } else if (format === 'json') {
            content = JSON.stringify(classifiedTestCases, null, 2); // Pretty JSON format
            mimeType = 'application/json';
            fileExtension = 'json';
        } else if (format === 'xml') {
            content = '<?xml version="1.0" encoding="UTF-8"?>\n<testCases>\n';
            content += classifiedTestCases
                .map(
                    (item) =>
                        `  <testCase>\n    <description>${item.testCase}</description>\n    <category>${item.category}</category>\n    <type>${item.type}</type>\n  </testCase>`
                )
                .join('\n');
            content += '\n</testCases>';
            mimeType = 'application/xml';
            fileExtension = 'xml';
        }

        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `classified_test_cases.${fileExtension}`;
        link.click();
    };

    return (
        <div className="test-case-classification-page">
            <header className="text-center my-4">
                <h1>Test Case Classification</h1>
                <p>Use predefined models to validate and classify test cases efficiently.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Upload or Enter Test Cases</h2>
                    <input
                        type="file"
                        accept=".txt,.csv"
                        onChange={handleFileUpload}
                        className="form-control my-2"
                        aria-label="Upload a .txt or .csv file containing test cases"
                    />
                    <textarea
                        className="form-control my-2"
                        rows={5}
                        placeholder="Enter test cases manually, one per line..."
                        onBlur={handleManualInput}
                    ></textarea>
                    {error && <p className="text-danger mt-2">{error}</p>}
                </section>
                <section className="my-4">
                    <h2>Classified Test Cases</h2>
                    {classifiedTestCases.length > 0 ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Test Case</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classifiedTestCases.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.testCase}</td>
                                            <td>{item.category}</td>
                                            <td>{item.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <button
                                    className="btn btn-success"
                                    onClick={moveToManagementPage}
                                    aria-label="Move test cases to Management Page"
                                >
                                    Move to Management Page
                                </button>
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
                            </div>
                            <div className="text-end mt-3">
                                    <small className="text-muted mt-1">Press to select and export a file type</small>
                            </div>
                        </>
                    ) : (
                        <p>No test cases classified yet. Please upload or enter test cases to classify.</p>
                    )}
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(TestCaseClassificationPage);