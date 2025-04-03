import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Assure-toi que ton backend tourne sur ce port
});

export default api;