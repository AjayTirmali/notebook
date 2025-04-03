import axios from 'axios';

// Using CORS Anywhere as a proxy to bypass CORS issues
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const API_URL = 'https://notebookbackend-47rlt6s3m-ajay-tirmalis-projects.vercel.app';

const api = axios.create({
  baseURL: CORS_PROXY + API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Required by CORS Anywhere
  },
});

export default api;

export const fetchNotes = () => api.get('/api/notes');
export const fetchNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);
