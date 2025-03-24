import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const SignUp: React.FC = () => {
  console.log('Rendering SignUp component');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Test Engineer');
  const authContext = useContext(AuthContext);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authContext?.register(email, password, role);
      alert('User registered successfully');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Test Engineer">Test Engineer</option>
        <option value="Administrator">Administrator</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;