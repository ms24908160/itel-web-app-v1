import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Test Engineer');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/signup',
        { email, password, role } // Request body
      );

      setMessage(`User registered successfully as ${response.data.role}`);
      console.log('Sign-up successful:', response.data);

      // Redirect to HomePage after a short delay
      setTimeout(() => {
        navigate('/'); // Replace '/' with your actual HomePage route
      }, 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          className="form-control"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Test Engineer">Test Engineer</option>
          <option value="Administrator">Administrator</option>
          <option value="Observer">Observer</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
      {message && <p className="mt-3 text-center">{message}</p>}
    </form>
  );
};

export default SignUp;