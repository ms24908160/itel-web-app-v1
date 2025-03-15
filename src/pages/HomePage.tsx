import React from 'react';
import withFooter from '../components/withFooter';
import '../styles/global.css'; // Import the global CSS file
import '../styles/HomePage.css'; // Import the homepage CSS file

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <header className="text-center my-4 header-container">
                <h1 className="animated-title">Welcome to ITEL</h1>
                <p className="animated-description">
                    Intelligent Test Engineering & Learning – your ultimate solution for efficient test case generation, validation, and management.<br />
                    ITEL revolutionizes the testing process by combining a systematic, rule-based methodology with smart automation and user-driven inputs.<br />
                    Say goodbye to cumbersome test case creation and welcome a streamlined approach that enhances quality assurance across your projects.
                </p>
            </header>
            <main className="container">
                <section className="my-4 animated-section">
                    <h2>Effortless Test Case Generation</h2>
                    <ul>
                        <li><strong>URL-Based Generation:</strong> ITEL analyzes your web application's structure to identify key UI elements and automatically creates comprehensive test scenarios.</li>
                        <li><strong>Screenshot-Based Generation:</strong> Leveraging OCR technology, ITEL converts screenshots into actionable test cases by mapping visual UI elements accurately.</li>
                    </ul>
                </section>
                <section className="my-4 animated-section">
                    <h2>Robust Test Case Management</h2>
                    <p>Organize your testing workflow with our intuitive management system. Easily classify, store, and modify test cases by functionality and priority using advanced filtering and search capabilities, ensuring you always have the right test case at your fingertips.</p>
                </section>
                <section className="my-4 animated-section">
                    <h2>Empower Your Team with Knowledge</h2>
                    <p>The integrated Information Panel serves as a learning hub, offering:</p>
                    <ul>
                        <li>Step-by-step tutorials</li>
                        <li>Industry-standard test templates</li>
                        <li>In-depth explanations of key testing concepts such as functional, regression, and performance testing</li>
                    </ul>
                    <p>Enhance your team's expertise and elevate your software quality assurance practices.</p>
                </section>
                <section className="my-4 animated-section">
                    <h2>Security and Scalability at Its Core</h2>
                    <p>With robust user authentication, role-based access control, and advanced encryption algorithms, ITEL safeguards your test cases from unauthorized modifications. Designed to scale effortlessly, our platform supports teams of every size – from small testing groups to large enterprise organizations.</p>
                </section>
                <section className="my-4 animated-section">
                    <h2>Discover a Smarter, More Efficient Way to Manage Your Testing Process with ITEL</h2>
                    <p>Experience the future of test engineering and learning today!</p>
                </section>
            </main>
        </div>
    );
};

export default withFooter(HomePage);