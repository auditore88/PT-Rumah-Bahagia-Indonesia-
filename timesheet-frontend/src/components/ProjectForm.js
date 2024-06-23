import React, { useState } from 'react';
import { createProject } from '../api';

const ProjectForm = () => {
    const [name, setName] = useState('');
    const [rate, setRate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        createProject({ name, rate }).then(() => {
            // Handle success
        }).catch(err => {
            // Handle error
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Rate</label>
                <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default ProjectForm;
