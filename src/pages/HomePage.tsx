import React from 'react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
    return (
        <div className="home-page">
            <Navbar />
            <header className="text-center my-4">
                <h1>Welcome to the Test Case Generation Tool</h1>
                <p>This application helps you generate and manage test cases efficiently.</p>
            </header>
            <main className="container">
                {/* Main content goes here */}
            </main>
        </div>
    );
};

export default HomePage;