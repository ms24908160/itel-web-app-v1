import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log('Login request initiated'); // Debugging log

      const response = await axios.post(
        'http://localhost:5000/signin', // Backend endpoint
        { email, password } // Request body
      );

      console.log('Login response:', response.data); // Log the backend response

      // Handle successful login
      setMessage('Login successful!'); // Update message on successful login
      console.log('Login successful:', response.data);

      // Redirect to home page after a short delay
      setTimeout(() => {
        console.log('Redirecting to /'); // Debugging log for redirection
        navigate('/'); // Replace '/home' with your actual home page route
      }, 2000);
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data); // Log the error response
        setMessage(error.response?.data?.message || 'An error occurred during login');
      } else {
        console.error('Unexpected error:', error); // Log unexpected errors
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default Login;