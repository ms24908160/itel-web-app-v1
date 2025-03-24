import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Account: React.FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h2>Account</h2>
      <p>Email: {authContext?.user?.email}</p>
      <p>Role: {authContext?.user?.role}</p>
      <button onClick={authContext?.logout}>Sign Out</button>
    </div>
  );
};

export default Account;