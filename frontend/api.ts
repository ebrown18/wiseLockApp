import axios from 'axios';

// Set up the base URL for your Django backend
const BASE_URL = 'http://127.0.0.1:8000'; // Change this to your backend's URL

// Axios instance with default headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Functions for interacting with the backend

// User Login
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/accounts/login/', { email, password });
    return response.data; // e.g., token or user info
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

// User Signup
export const signup = async (username: string, email: string, password1: string, password2: string) => {
  try {
    const response = await apiClient.post('/accounts/users/', {
      username,
      email,
      password1,
      password2,
    });
    return response.data;
  } catch (error: any) {
    console.error('Signup error:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch Password List
export const getPasswords = async () => {
  try {
    const response = await apiClient.get('/accounts/password_list/');
    return response.data; // List of passwords
  } catch (error: any) {
    console.error('Get passwords error:', error.response?.data || error.message);
    throw error;
  }
};

// Add a Password
export const addPassword = async (label: string, value: string, token: string) => {
  try {
    const response = await apiClient.post(
      '/accounts/add_password/',
      { label, value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Add password error:', error.response?.data || error.message);
    throw error;
  }
};

// Update a Password
export const updatePassword = async (passwordId: number, newValue: string, token: string) => {
  try {
    const response = await apiClient.post(
      `/accounts/update_password/${passwordId}/`,
      { new_password: newValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Update password error:', error.response?.data || error.message);
    throw error;
  }
};
