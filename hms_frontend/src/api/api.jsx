import axios from 'axios';

const API_URL = 'https://hms3255.netlify.app';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const signup = (data) =>
    api.post('/auth/signup', data);

export const signin = (email, password) =>
    api.post('/auth/signin', { email, password });

export const createHospital = (data) =>
    api.post('/hospitals/create', data);