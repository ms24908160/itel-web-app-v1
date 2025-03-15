import React from 'react';
import withFooter from '../components/withFooter';

import '../styles/global.css'; // Import the global CSS file

const TestCaseGenerationPage: React.FC = () => {
    return (
        <div className="test-case-generation-page">
                <header className="text-center my-4">
                    <h1>Test Case Generation</h1>
                    <p>Generate test cases efficiently using our tool.</p>
                </header>
                <main className="container">
                    {/* Main content goes here */}
                </main>
        </div>
    );
};

export default withFooter(TestCaseGenerationPage);