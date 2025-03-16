import React from 'react';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file
import '../styles/testCaseGenerationPage.css'; // Import the specific CSS file for this page

const TestCaseGenerationPage: React.FC = () => {
    return (
        <div className="test-case-generation-page">
            <header className="text-center my-4">
                <h1>Test Case Generation</h1>
                <p>Generate test cases efficiently using our tool.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Choose a Generation Method</h2>
                    <div className="generation-options">
                        <div className="option">
                            <div className="option-content">
                                <h3>URL-Based Generation</h3>
                                <p>Analyze your web application's structure to identify key UI elements and automatically create comprehensive test scenarios.</p>
                            </div>
                            <a href="/url-based-generation" className="go-button">
                                Go →
                            </a>
                        </div>
                        <div className="option">
                            <div className="option-content">
                                <h3>Screenshot-Based Generation</h3>
                                <p>Leverage OCR technology to convert screenshots into actionable test cases by mapping visual UI elements accurately.</p>
                            </div>
                            <a href="/screenshot-based-generation" className="go-button">
                                Go →
                            </a>
                        </div>
                        <div className="option">
                            <div className="option-content">
                                <h3>Test Case Classification</h3>
                                <p>Use predefined models to validate and classify test cases efficiently.</p>
                            </div>
                            <a href="/test-case-classification" className="go-button">
                                Go →
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default withFooter(TestCaseGenerationPage);