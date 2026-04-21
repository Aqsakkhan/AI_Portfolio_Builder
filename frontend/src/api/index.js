import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
});

// Portfolio API
export const createPortfolio = (data) => API.post('/api/portfolio', data);
export const getPortfolio = (slug) => API.get(`/api/portfolio/${slug}`);
export const updatePortfolio = (slug, data) => API.put(`/api/portfolio/${slug}`, data);
export const deletePortfolio = (slug) => API.delete(`/api/portfolio/${slug}`);
export const publishPortfolio = (slug) => API.post(`/api/portfolio/${slug}/publish`);

// AI API
export const enhanceBio = (text) => API.post('/api/ai/enhance-bio', { text });
export const enhanceProject = (text) => API.post('/api/ai/enhance-project', { text });
export const suggestSkills = (bio, projects) => API.post('/api/ai/suggest-skills', { bio, projects });
export const enhanceExperience = (text) => API.post('/api/ai/enhance-experience', { text });
