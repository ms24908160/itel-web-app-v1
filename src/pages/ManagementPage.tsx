import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const ManagementPage: React.FC = () => {
    const [userFiles, setUserFiles] = useState<any[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<any[]>([]);
    const [editableContent, setEditableContent] = useState<any[]>([]);
    const [editHistory, setEditHistory] = useState<any[][]>([]);
    const [tableHeaders, setTableHeaders] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [role, setRole] = useState<string | null>(null); // Track the user's role
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const pageTag = queryParams.get('pageTag');

    // Decode user role from JWT and apply role-based restrictions
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin-signup'); // Redirect to login if not logged in
            return;
        }

        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
            setRole(decodedToken.role);

            // Redirect if the user role is not authorized
            if (decodedToken.role === 'Observer') {
                console.warn('Access restricted for Observer role.');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            navigate('/signin-signup'); // Redirect to login if token is invalid
        }
    }, [navigate]);

    // Fetch user files
    const fetchUserFiles = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated. Please log in.');
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError('');

            const response = await fetch(
                `http://localhost:5000/api/get-user-files${pageTag ? `?pageTag=${pageTag}` : ''}`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch user files.');
            }

            const data = await response.json();
            setUserFiles(data.files || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch file content
    const fetchFileContent = async (fileName: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/get-file-content?fileName=${fileName}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch file content.');
            }

            const data = await response.json();

            if (data.content && data.content.length > 0) {
                const headers = Object.keys(data.content[0]);
                setTableHeaders(headers);
            }

            setFileContent(data.content || []);
            setEditableContent(data.content || []);
            setSelectedFile(fileName);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        }
    };

    // Save changes
    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/save-file-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ fileName: selectedFile, content: editableContent }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save changes.');
            }

            const data = await response.json();
            setFileContent(data.content || []);
            setEditableContent(data.content || []);
            setIsEditMode(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        }
    };

    // Undo last edit
    const undoLastEdit = () => {
        if (editHistory.length > 0) {
            const lastEdit = editHistory[editHistory.length - 1];
            setEditableContent(lastEdit);
            setEditHistory(editHistory.slice(0, -1));
        } else {
            setError('No edits to undo.');
        }
    };

    // Export file
    const exportFile = (format: string) => {
        if (fileContent.length === 0) {
            setError('No content to export.');
            return;
        }

        let content = '';
        let mimeType = '';
        let fileExtension = '';

        if (format === 'csv') {
            content = tableHeaders.join(',') + '\n';
            content += fileContent.map((row) => tableHeaders.map((header) => row[header]).join(',')).join('\n');
            mimeType = 'text/csv';
            fileExtension = 'csv';
        } else if (format === 'txt') {
            content = fileContent
                .map((row) => tableHeaders.map((header) => `${header}: ${row[header]}`).join('\n'))
                .join('\n\n');
            mimeType = 'text/plain';
            fileExtension = 'txt';
        } else if (format === 'json') {
            content = JSON.stringify(fileContent, null, 2);
            mimeType = 'application/json';
            fileExtension = 'json';
        } else if (format === 'xml') {
            content = '<?xml version="1.0" encoding="UTF-8"?>\n<testCases>\n';
            content += fileContent
                .map(
                    (row) =>
                        `  <testCase>\n${tableHeaders
                            .map((header) => `    <${header}>${row[header]}</${header}>`)
                            .join('\n')}\n  </testCase>`
                )
                .join('\n');
            content += '\n</testCases>';
            mimeType = 'application/xml';
            fileExtension = 'xml';
        }

        const blob = new Blob([content], { type: mimeType });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `exported_file.${fileExtension}`;
        link.click();
    };

    // Filter files based on search query
    const filteredFiles = userFiles.filter((file) =>
        file.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        fetchUserFiles();
    }, [pageTag]);

    return (
        <div className={`management-page d-flex ${role === 'Observer' ? 'blurred' : ''}`}>
            {/* Translucent overlay for Observer role */}
            {role === 'Observer' && (
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10,
                    }}
                >
                    <h2 className="text-white text-center">Access Restricted</h2>
                    <p className="text-white text-center">
                        Please contact a <strong>MORDOR Dev</strong> to change your role to Administrator or Engineer.
                    </p>
                </div>
            )}
            {/* Left Panel: Your Files */}
            <aside className="files-panel border-end p-3" style={{ width: '25%', overflowY: 'auto' }}>
                <h2>Your Files</h2>
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoading ? (
                    <div className="text-center my-4">
                        <p>Loading files...</p>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : filteredFiles.length > 0 ? (
                    <ul className="list-group">
                        {filteredFiles.map((file) => (
                            <li
                                key={file}
                                className={`list-group-item ${selectedFile === file ? 'active' : ''}`}
                                onClick={() => fetchFileContent(file)}
                                style={{ cursor: 'pointer' }}
                            >
                                {file}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted">No files match your search.</p>
                )}
            </aside>

            {/* Right Panel: File Content */}
            <main className="content-panel p-3" style={{ width: '75%' }}>
                <header className="text-center my-4">
                    <h1>Test Case Management</h1>
                    {error && <p className="text-danger text-center">{error}</p>}
                </header>
                <section className="my-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="btn btn-secondary" onClick={() => setIsEditMode(!isEditMode)}>
                            {isEditMode ? 'Switch to View Mode' : 'Switch to Edit Mode'}
                        </button>
                        <DropdownButton id="dropdown-basic-button" title="Export">
                            <Dropdown.Item onClick={() => exportFile('csv')}>Export as CSV</Dropdown.Item>
                            <Dropdown.Item onClick={() => exportFile('txt')}>Export as TXT</Dropdown.Item>
                            <Dropdown.Item onClick={() => exportFile('json')}>Export as JSON</Dropdown.Item>
                            <Dropdown.Item onClick={() => exportFile('xml')}>Export as XML</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    {fileContent.length > 0 ? (
                        <>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th key={header}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {editableContent.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {tableHeaders.map((header) => (
                                                <td key={header}>
                                                    {isEditMode ? (
                                                        <input
                                                            type="text"
                                                            value={row[header]}
                                                            onChange={(e) =>
                                                                setEditableContent((prev) => {
                                                                    const updated = [...prev];
                                                                    updated[rowIndex][header] = e.target.value;
                                                                    return updated;
                                                                })
                                                            }
                                                            className="form-control"
                                                        />
                                                    ) : (
                                                        row[header]
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-success" onClick={saveChanges}>
                                    Save Changes
                                </button>
                                <button className="btn btn-warning" onClick={undoLastEdit}>
                                    Undo Last Edit
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>Select a file to view its content.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default withFooter(ManagementPage);