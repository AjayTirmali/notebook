import axios from 'axios';

// Direct connection to backend
const API_URL = 'https://notebookbackend-47rlt6s3m-ajay-tirmalis-projects.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// Add request/response interceptors for debugging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const fetchNotes = () => api.get('/api/notes');
export const fetchNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);
