import React, { useEffect, useState } from 'react';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file
import '../styles/testCaseGenerationPage.css'; // Import the specific CSS file for this page

const TestCaseGenerationPage: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);

   
    useEffect(() => {
        const fetchUserRole = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
                    setRole(decodedToken.role);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
        };

        fetchUserRole();
    }, []);

    // Handle restricted access
    const handleRestrictedAccess = () => {
        alert('Access denied. You must be an Engineer or Administrator to access this tool.');
    };

    return (
        <div className="test-case-generation-page">
            {/* Floating Role Badge below the navbar */}
            {role && (
                <div className="floating-role-badge" title={`You are logged in as ${role}`}>
                    Logged in as: <strong>{role}</strong>
                </div>
            )}

            <header className="text-center my-4">
                <h1>Test Case Generation</h1>
                <p>Generate test cases efficiently using our tool.</p>
            </header>
            <main className="container test-case-generation-page-container">
                <h2>Choose a Generation Method</h2>
                <section className="my-3-options ">
                    
                    
                        {/* Option 1: URL-Based Generation (Accessible to all users) */}
                        <div className="select_option">
                            <div className="option-content">
                                <h3>URL-Based Generation</h3>
                                <p>Analyze your web application's structure to identify key UI elements and automatically create comprehensive test scenarios.</p>
                            </div>
                            <a href="/url-based-generation" className="go-button">
                                Go →
                            </a>
                        </div>

                        {/* Option 2: Screenshot-Based Generation (Accessible to all users) */}
                        <div className="select_option">
                            <div className="option-content">
                                <h3>Screenshot-Based Generation</h3>
                                <p>Leverage OCR technology to convert screenshots into actionable test cases by mapping visual UI elements accurately.</p>
                            </div>
                            <a href="/screenshot-based-generation" className="go-button">
                                Go →
                            </a>
                        </div>

                        {/* Option 3: Test Case Classification (Restricted to Engineer and Administrator roles) */}
                        <div className="select_option">
                            <div className="option-content">
                                <h3>Test Case Classification</h3>
                                <p>Use predefined models to validate and classify test cases efficiently.</p>
                            </div>
                            {role === 'Engineer' || role === 'Administrator' ? (
                                <a href="/test-case-classification" className="go-button">
                                    Go →
                                </a>
                            ) : (
                                <button
                                    className="go-button disabled"
                                    onClick={handleRestrictedAccess}
                                >
                                    Restricted
                                </button>
                            )}
                        </div>
                    
                </section>
            </main>
        </div>
    );
};

export default withFooter(TestCaseGenerationPage);