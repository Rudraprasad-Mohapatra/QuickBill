import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
    // baseURL: 'http://localhost:3000', // Set your base URL here
    baseURL: 'https://quickbillbackend-production.up.railway.app', // Set your base URL here
    timeout: 10000, // Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
        // You can add more default headers here
    },
});

export default apiClient;
