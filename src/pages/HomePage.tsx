import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // Import the global CSS file

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <Navbar />
            <div className="main-content">
                <header className="text-center my-4">
                    <h1>Welcome to the Test Case Generation Tool</h1>
                    <p>This application helps you generate and manage test cases efficiently.</p>
                </header>
                <main className="container">
                    {/* Main content goes here */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;