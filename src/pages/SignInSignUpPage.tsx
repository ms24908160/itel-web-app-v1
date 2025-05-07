import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SignInSignUpPage.css';

const SignInSignUpPage: React.FC = () => {
    // State for Sign-Up form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Observer');
    const [message, setMessage] = useState('');
    const [hasCookie, setHasCookie] = useState(false);

    // Check for the presence of a cookie
    useEffect(() => {
        const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
        const jwtCookie = cookies.find((cookie) => cookie.startsWith('token='));
        setHasCookie(!!jwtCookie); // Set to true if the cookie exists
    }, []);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send Sign-Up data to the backend
            const response = await axios.post(
                'http://localhost:5000/signup', // Replace with your backend endpoint
                { email, password, role },
                { withCredentials: true } // Include cookies in the request
            );

            // Handle success response
            setMessage(`User registered successfully as ${response.data.role}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                setMessage(error.response?.data?.message || 'An error occurred');
            } else {
                // Handle other errors
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
                    {/* Suggest Sign-Up if no cookie is found */}
                    {!hasCookie && (
                        <div className="col-md-8 text-center">
                            <p className="alert alert-warning">
                                No account detected. Please <strong>sign up</strong> to create an account.
                            </p>
                        </div>
                    )}

                    {/* Sign In Section */}
                    <div className={`col-md-5 ${!hasCookie ? 'dimmed' : ''}`}>
                        <div className="card login-card">
                            <div className="card-body">
                                <h2 className="card-title">Sign In</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="signin-email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="signin-email"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="signin-password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="signin-password"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Sign In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Section */}
                    <div className={`col-md-5 ${!hasCookie ? 'highlight' : ''}`}>
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