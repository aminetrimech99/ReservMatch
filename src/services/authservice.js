// src/services/authService.js

import axios from 'axios';

// Base URL for the API
const API_URL = 'http://57.128.159.235:3000/api/auth/';

// Function to handle signup
export const signUp = async (userData) => {
    try {
        console.log('userData', userData);
        const response = await axios.post(`${API_URL}local/signup`, userData, {
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        });
        
        console.log('Response:', response);
        return response; // Return only the data from the response for easier handling
        
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response);
            return error.response; // Return the error data from the server
        } else if (error.request) {
            console.error('Error request:', error.request);
            return { error: 'No response received from the server.' };
        } else {
            console.error('Error message:', error.message);
            return { error: error.message };
        }
    }
};

export const login = async (data) => {
    const response = await axios.post(`${API_URL}local/signin`, data, {
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
        },
    });
    return response; // Return only the data from the response
};

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API_URL}forgot-password`, data, {
        headers: {
            'Content-Type': 'application/json', // Set content type to JSON
        },
    });
    return response; // Return only the data from the response
};
