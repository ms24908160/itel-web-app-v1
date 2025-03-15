import React from 'react';
import withFooter from '../components/withFooter';

import '../styles/global.css'; // Import the global CSS file

const TestCaseTemplatesPage: React.FC = () => {
    return (
        <div className="test-case-templates-page">
                <header className="text-center my-4">
                    <h1>Test Case Templates</h1>
                    <p>Manage and use test case templates.</p>
                </header>
                <main className="container">
                    {/* Main content goes here */}
                </main>   
        </div>
    );
};

export default withFooter(TestCaseTemplatesPage);