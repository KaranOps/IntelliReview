import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const reviewCode = async (codeSnippet) => {
    try {
        const response = await api.post('/review', { codeSnippet });
        return response.data;
    } catch (error) {
        console.error("Error during code review:", error);
        throw error;
    }
};

export default api;
