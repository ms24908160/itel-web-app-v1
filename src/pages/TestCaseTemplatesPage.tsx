import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // Import the global CSS file

const TestCaseTemplatesPage: React.FC = () => {
    return (
        <div className="test-case-templates-page">
            <Navbar />
            <div className="main-content">
                <header className="text-center my-4">
                    <h1>Test Case Templates</h1>
                    <p>Manage and use test case templates.</p>
                </header>
                <main className="container">
                    {/* Main content goes here */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default TestCaseTemplatesPage;