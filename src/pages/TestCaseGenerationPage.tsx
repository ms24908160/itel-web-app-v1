import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // Import the global CSS file

const TestCaseGenerationPage: React.FC = () => {
    return (
        <div className="test-case-generation-page">
            <Navbar />
            <div className="main-content">
                <header className="text-center my-4">
                    <h1>Test Case Generation</h1>
                    <p>Generate test cases efficiently using our tool.</p>
                </header>
                <main className="container">
                    {/* Main content goes here */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default TestCaseGenerationPage;