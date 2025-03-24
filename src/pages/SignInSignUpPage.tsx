import React from 'react';
import withFooter from '../components/withFooter';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import '../styles/SignInSignUpPage.css';

const SignInSignUpPage: React.FC = () => {
    console.log('Rendering SignInSignUpPage');
    return (
        <div className="signin-signup-page">
            <header className="text-center my-4">
                <h1>Sign In / Sign Up</h1>
                <p>Please sign in or sign up to continue.</p>
            </header>
            <main className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Sign In</h2>
                        <Login />
                    </div>
                    <div className="col-md-6">
                        <h2>Sign Up</h2>
                        <SignUp />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default withFooter(SignInSignUpPage);