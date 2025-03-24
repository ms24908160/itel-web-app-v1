import React, { useState } from 'react';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Test Engineer');

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just log the values
    console.log('Sign Up:', { email, password, role });
    alert('User registered successfully');
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
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
    </form>
  );
};

export default SignUp;