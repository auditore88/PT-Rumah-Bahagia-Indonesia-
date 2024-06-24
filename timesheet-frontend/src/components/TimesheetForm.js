import React, { useState, useEffect } from 'react';
import { getTimesheets, createTimesheet, updateTimesheet, deleteTimesheet, getProjects } from '../api';
import { CSVLink } from 'react-csv';


const TimesheetComponent = () => {
    const [timesheets, setTimesheets] = useState([]);
    const [projects, setProjects] = useState([]);
    const [editingTimesheet, setEditingTimesheet] = useState(null);
    const [projectId, setProjectId] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');

    useEffect(() => {
        fetchTimesheets();
        fetchProjects();
    }, []);

    const fetchTimesheets = () => {
        getTimesheets().then(response => setTimesheets(response.data));
    };

    const fetchProjects = () => {
        getProjects().then(response => setProjects(response.data));
    };

    const handleEdit = (timesheet) => {
        setEditingTimesheet(timesheet);
        setProjectId(timesheet.projectId);
        setDate(timesheet.date);
        setHours(timesheet.hours);
    };

    const handleDelete = (id) => {
        deleteTimesheet(id).then(() => fetchTimesheets());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { projectId, date, hours };

        if (editingTimesheet) {
            updateTimesheet(editingTimesheet.id, data).then(() => {
                setEditingTimesheet(null);
                setProjectId('');
                setDate('');
                setHours('');
                fetchTimesheets();
            });
        } else {
            createTimesheet(data).then(() => {
                setProjectId('');
                setDate('');
                setHours('');
                fetchTimesheets();
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Project</label>
                    <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                        <option value="">Select Project</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div>
                    <label>Hours</label>
                    <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
                </div>
                <button type="submit">Save</button>
                {editingTimesheet && (
                    <button type="button" onClick={() => {
                        setEditingTimesheet(null);
                        setProjectId('');
                        setDate('');
                        setHours('');
                    }}>Cancel</button>
                )}
            </form>

            <CSVLink data={timesheets} filename={"timesheets.csv"}>
                Export CSV
            </CSVLink>
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Hours</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {timesheets.map(timesheet => (
                        <tr key={timesheet.id}>
                            <td>{projects.find(project => project.id === timesheet.projectId)?.name}</td>
                            <td>{timesheet.date}</td>
                            <td>{timesheet.hours}</td>
                            <td>
                                <button onClick={() => handleEdit(timesheet)}>Edit</button>
                                <button onClick={() => handleDelete(timesheet.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimesheetComponent;
