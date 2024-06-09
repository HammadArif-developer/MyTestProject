// api/index.js
import axios from 'axios';

// Define your API base URL
const baseURL = 'http://localhost:4000/api/';

const api = axios.create({
  baseURL,
});

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// Example function to make a POST request
const registerUser = async (userData) => {
  try {
    const response = await api.post('auth/register', userData);
    return response; // Return the entire response object
  } catch (error) {
    throw error; // Re-throw the error to propagate it to the calling code
  }
};
const loginUser = async (userData) => {
    try {
      const response = await api.post('auth/login', userData);
      return response; 
    } catch (error) {
      throw error; 
    }
  };

const validateTokenAuth = async (token) => {
  try {
    const response = await api.get('auth/validate', {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }});
    return response; 
  } catch (error) {
    throw error; 
  }
}
export  {registerUser,loginUser,passwordRegex,validateTokenAuth};
