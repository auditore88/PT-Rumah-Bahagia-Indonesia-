// controllers/projectController.js
const Project = require('../models/project');

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, rate } = req.body;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        project.name = name;
        project.rate = rate;
        await project.save();

        res.send(project);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findByPk(id);
        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }
        await project.destroy();

        res.send({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};