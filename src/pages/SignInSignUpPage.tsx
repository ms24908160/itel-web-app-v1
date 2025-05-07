import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignInSignUpPage.css';
import { useNavigate } from 'react-router-dom';

const SignInSignUpPage: React.FC = () => {
    // State for Sign-Up and Sign-In forms
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Observer');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // React Router's navigation hook

    // Handle Sign-Up
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/signup', // Replace with your backend endpoint
                { email, password, role }
            );

            setMessage(`User registered successfully as ${response.data.role}`);
            console.log('Sign-up successful:', response.data);

            // Redirect to HomePage after a short delay
            setTimeout(() => {
                navigate('/'); // Replace '/' with your actual HomePage route
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'An error occurred');
            } else {
                setMessage('An unexpected error occurred');
            }
        }
    };

    // Handle Sign-In
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/signin', // Replace with your backend endpoint
                { email, password }
            );

            setMessage('Login successful!');
            console.log('Sign-in successful:', response.data);

            // Redirect to HomePage after a short delay
            setTimeout(() => {
                navigate('/'); // Replace '/' with your actual HomePage route
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'An error occurred');
            } else {
                setMessage('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="signin-signup-page">
            <header className="text-center my-4">
                <h1>Sign In / Sign Up</h1>
                <p>Please sign in or sign up to continue.</p>
            </header>
            <main className="container">
                <div className="row justify-content-center">
                    {/* Sign In Section */}
                    <div className="col-md-5">
                        <div className="card login-card">
                            <div className="card-body">
                                <h2 className="card-title">Sign In</h2>
                                <form onSubmit={handleSignIn}>
                                    <div className="form-group">
                                        <label htmlFor="signin-email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="signin-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signin-password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="signin-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Sign In
                                    </button>
                                </form>
                                {message && <p className="mt-3 text-center">{message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Section */}
                    <div className="col-md-5">
                        <div className="card signup-card">
                            <div className="card-body">
                                <h2 className="card-title">Sign Up</h2>
                                <form onSubmit={handleSignUp}>
                                    <div className="form-group">
                                        <label htmlFor="signup-email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="signup-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signup-password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="signup-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signup-role">Role</label>
                                        <select
                                            className="form-control"
                                            id="signup-role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="Observer">Observer</option>
                                            <option value="Test Engineer">Test Engineer</option>
                                            <option value="Administrator">Administrator</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-success btn-block">
                                        Sign Up
                                    </button>
                                </form>
                                {message && <p className="mt-3 text-center">{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignInSignUpPage;