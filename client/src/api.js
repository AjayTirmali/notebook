import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

export const fetchNotes = () => api.get('/api/notes');
export const fetchNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);
