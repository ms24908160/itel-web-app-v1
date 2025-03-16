import React from 'react';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file

const URLBasedGenerationPage: React.FC = () => {
    return (
        <div className="url-based-generation-page">
            <header className="text-center my-4">
                <h1>URL-Based Generation</h1>
                <p>Analyze your web application's structure to identify key UI elements and automatically create comprehensive test scenarios.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Details</h2>
                    <p>Details about URL-Based Generation...</p>
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(URLBasedGenerationPage);