import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css'; // Import the global CSS file

const SignInSignUpPage: React.FC = () => {
    return (
        <div className="signin-signup-page">
            <Navbar />
            <div className="main-content">
                <header className="text-center my-4">
                    <h1>Sign In / Sign Up</h1>
                    <p>Please sign in or sign up to continue.</p>
                </header>
                <main className="container">
                    {/* Sign In / Sign Up form goes here */}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default SignInSignUpPage;