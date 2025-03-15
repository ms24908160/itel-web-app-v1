import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo_500x499.png';
import Navbar from '../components/Navbar';

const QualityAssuranceKnowledgePage: React.FC = () => {
    return (
        <div className="quality-assurance-knowledge-page">
            <Navbar />
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