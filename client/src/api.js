import axios from 'axios';

// Direct connection to backend API
const API_URL = 'https://notebookbackend-47rlt6s3m-ajay-tirmalis-projects.vercel.app';

// Create an Axios instance with appropriate config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 seconds timeout
});

// Basic API functions
export const fetchNotes = () => api.get('/api/notes');
export const fetchNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);

// Test functions
export const testAPI = () => api.get('/api/test');
export const testCORS = () => api.get('/api/cors-test');
export const testPost = (data) => api.post('/api/cors-test', data || { test: true });

export default api;
