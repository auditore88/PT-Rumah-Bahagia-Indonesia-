import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../api';

const ProjectComponent = () => {
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [name, setName] = useState('');
    const [rate, setRate] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        getProjects().then(response => setProjects(response.data));
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setName(project.name);
        setRate(project.rate);
    };

    const handleDelete = (id) => {
        deleteProject(id).then(() => fetchProjects());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name, rate };

        if (editingProject) {
            updateProject(editingProject.id, data).then(() => {
                setEditingProject(null);
                setName('');
                setRate('');
                fetchProjects();
            });
        } else {
            createProject(data).then(() => {
                setName('');
                setRate('');
                fetchProjects();
            });
        }
    };

    return (
        <div>
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
                {editingProject && (
                    <button type="button" onClick={() => {
                        setEditingProject(null);
                        setName('');
                        setRate('');
                    }}>Cancel</button>
                )}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.rate}</td>
                            <td>
                                <button onClick={() => handleEdit(project)}>Edit</button>
                                <button onClick={() => handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectComponent;
