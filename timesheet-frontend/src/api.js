import axios from 'axios';

const api = axios.create({
    baseURL: 'https://timesheet-backend-rouge.vercel.app'
});

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);

export const getTimesheets = () => api.get('/timesheets');
export const createTimesheet = (data) => api.post('/timesheets', data);
