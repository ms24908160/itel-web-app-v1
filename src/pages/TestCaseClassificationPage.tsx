import React from 'react';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file

const TestCaseClassificationPage: React.FC = () => {
    return (
        <div className="test-case-classification-page">
            <header className="text-center my-4">
                <h1>Test Case Classification</h1>
                <p>Use predefined models to validate and classify test cases efficiently.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Details</h2>
                    <p>Details about Test Case Classification...</p>
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(TestCaseClassificationPage);