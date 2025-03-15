import React from 'react';
import withFooter from '../components/withFooter';
import 'bootstrap/dist/css/bootstrap.min.css';


const QualityAssuranceKnowledgePage: React.FC = () => {
    return (
        <div className="quality-assurance-knowledge-page">
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

export default withFooter(QualityAssuranceKnowledgePage);