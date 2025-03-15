// import axios from 'axios';

// const API_BASE_URL = 'http://your-api-url.com';

// // Function to handle user authentication
// export const authenticateUser = async (credentials) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
//         return response.data;
//     } catch (error) {
//         throw new Error('Authentication failed');
//     }
// };

// // Function to register a new user
// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // Function to fetch test cases
// export const fetchTestCases = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/test-cases`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // Function to create a new test case
// export const createTestCase = async (testCaseData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/test-cases`, testCaseData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // Function to update an existing test case
// export const updateTestCase = async (testCaseId, testCaseData) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/test-cases/${testCaseId}`, testCaseData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// // Function to delete a test case
// export const deleteTestCase = async (testCaseId) => {
//     try {
//         const response = await axios.delete(`${API_BASE_URL}/test-cases/${testCaseId}`);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };