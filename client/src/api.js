import axios from 'axios';

// Direct connection to backend
const API_URL = 'https://notebookbackend-47rlt6s3m-ajay-tirmalis-projects.vercel.app';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout for slower responses
  timeout: 10000,
});

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
    console.error('API Response Error:', error.response || error);
    return Promise.reject(error);
  }
);

// Simple test functions
export const testAPI = () => api.get('/api/test');
export const testCORS = () => api.get('/api/cors-test');
export const testPost = (data) => api.post('/api/cors-test', data || { test: true });

// Special test for OPTIONS preflight
export const testOptions = () => {
  // Manually create a fetch with OPTIONS method
  return fetch(`${API_URL}/api/cors-test`, {
    method: 'OPTIONS',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    // Log all the response headers for diagnosis
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    return {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
      url: response.url,
      ok: response.ok
    };
  });
};

// Regular API functions
export const fetchNotes = () => api.get('/api/notes');
export const fetchNote = (id) => api.get(`/api/notes/${id}`);
export const createNote = (note) => api.post('/api/notes', note);
export const updateNote = (id, note) => api.put(`/api/notes/${id}`, note);
export const deleteNote = (id) => api.delete(`/api/notes/${id}`);

export default api;
