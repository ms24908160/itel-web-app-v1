import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const Account: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [account, setAccount] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/account', { withCredentials: true });
        setAccount(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      authContext?.logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h2>Account</h2>
      {account ? (
        <>
          <p>Email: {account.email}</p>
          <p>Role: {account.role}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
};

export default Account;