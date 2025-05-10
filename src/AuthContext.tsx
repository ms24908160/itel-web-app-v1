// filepath: src/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the structure of the authentication context
interface AuthContextType {
  user: any; // Represents the authenticated user
  loading: boolean; // Indicates whether the authentication process is in progress
  login: (email: string, password: string) => Promise<void>; // Function to log in a user
  register: (email: string, password: string, role: string) => Promise<void>; // Function to register a new user
  logout: () => void; // Function to log out the user
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component to wrap the application and provide authentication context
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // State to store the authenticated user
  const [loading, setLoading] = useState(true); // State to track the loading status

  // Effect to check for a token in localStorage and validate it on component mount
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
      // Validate the token by making an API call
      axios.get('/api/auth/user', { headers: { 'x-auth-token': token } })
        .then(res => {
          setUser(res.data); // Set the authenticated user data
          setLoading(false); // Set loading to false after validation
        })
        .catch(() => {
          localStorage.removeItem('token'); // Remove invalid token
          setLoading(false); // Set loading to false if validation fails
        });
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, []);

  // Function to log in a user
  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login', { email, password }); // Send login request
    localStorage.setItem('token', res.data.token); // Store the token in localStorage
    setUser(res.data.user); // Set the authenticated user data
  };

  // Function to register a new user
  const register = async (email: string, password: string, role: string) => {
    await axios.post('/api/auth/register', { email, password, role }); // Send registration request
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setUser(null); // Clear the authenticated user data
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext and AuthProvider for use in other components
export { AuthContext, AuthProvider };