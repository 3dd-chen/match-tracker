import axios from 'axios';

const API_URL = 'http://localhost:5105/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMatches = async () => {
    try {
        const response = await api.get('/match');
        return response.data;
    } catch (error) {
        console.error('Error fetching matches:', error);
        throw error;
    }
};

export default api;
