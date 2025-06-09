import axios from 'axios';

const api = axios.create({
  baseURL: 'https://walklog-backend.onrender.com'
});

export default api;