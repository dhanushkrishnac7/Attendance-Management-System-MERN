import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001/' }); // Replace with your backend's URL

export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
