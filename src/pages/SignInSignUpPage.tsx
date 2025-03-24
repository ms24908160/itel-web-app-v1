import React from 'react';
import withFooter from '../components/withFooter';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import '../styles/SignInSignUpPage.css';

const SignInSignUpPage: React.FC = () => {
    return (
        <div className="signin-signup-page">
            <header className="text-center my-4">
                <h1>Sign In / Sign Up</h1>
                <p>Please sign in or sign up to continue.</p>
            </header>
            <main className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card login-card">
                            <div className="card-body">
                                <h2 className="card-title">Sign In</h2>
                                <Login />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card signup-card">
                            <div className="card-body">
                                <h2 className="card-title">Sign Up</h2>
                                <SignUp />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default withFooter(SignInSignUpPage);