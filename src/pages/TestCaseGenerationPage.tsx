import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestCaseGenerationPage: React.FC = () => {
    return (
        <div className="test-case-generation-page">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Logo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/test-case-templates">Test Case Templates</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/quality-assurance-knowledge">Quality Assurance Knowledge</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                    </ul>
                </div>
            </nav>
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

export default TestCaseGenerationPage;