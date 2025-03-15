import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo_500x499.png';

const QualityAssuranceKnowledgePage: React.FC = () => {
    return (
        <div className="quality-assurance-knowledge-page">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" style={{ height: '150px', width: 'auto' }} />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/test-case-generation">Test Case Generation</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/test-case-templates">Test Case Templates</a>
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
                <h1>Quality Assurance Knowledge</h1>
                <p>Learn about quality assurance best practices and methodologies.</p>
            </header>
            <main className="container">
                {/* Main content goes here */}
            </main>
        </div>
    );
};

export default QualityAssuranceKnowledgePage;