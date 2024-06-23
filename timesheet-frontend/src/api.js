import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);

export const getTimesheets = () => api.get('/timesheets');
export const createTimesheet = (data) => api.post('/timesheets', data);
