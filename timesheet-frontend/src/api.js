import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000'
});

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data); // Update project
export const deleteProject = (id) => api.delete(`/projects/${id}`); // Delete project

export const getTimesheets = () => api.get('/timesheets');
export const createTimesheet = (data) => api.post('/timesheets', data);
export const updateTimesheet = (id, data) => api.put(`/timesheets/${id}`, data); // Update timesheet
export const deleteTimesheet = (id) => api.delete(`/timesheets/${id}`); // Delete timesheet