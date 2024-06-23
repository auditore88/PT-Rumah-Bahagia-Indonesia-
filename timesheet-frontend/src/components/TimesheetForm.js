import React, { useState, useEffect } from 'react';
import { getProjects, createTimesheet } from '../api';

const TimesheetForm = () => {
    const [projects, setProjects] = useState([]);
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        getProjects().then(response => {
            setProjects(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        createTimesheet({ projectId, date, hours }).then(() => {
            // Handle success
        }).catch(err => {
            // Handle error
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Project</label>
                <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
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
        </form>
    );
};

export default TimesheetForm;
