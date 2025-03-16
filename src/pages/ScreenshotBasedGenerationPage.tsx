import React from 'react';
import BackButton from '../components/BackButton';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file

const ScreenshotBasedGenerationPage: React.FC = () => {
    return (
        <div className="screenshot-based-generation-page">
            <header className="text-center my-4">
                <h1>Screenshot-Based Generation</h1>
                <p>Leverage OCR technology to convert screenshots into actionable test cases by mapping visual UI elements accurately.</p>
            </header>
            <main className="container">
                <section className="my-4">
                    <h2>Details</h2>
                    <p>Details about Screenshot-Based Generation...</p>
                </section>
            </main>
            <BackButton />
        </div>
    );
};

export default withFooter(ScreenshotBasedGenerationPage);