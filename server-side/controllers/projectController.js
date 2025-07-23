const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can add projects' });
    }

    const {
      project_name,
      client_name,
      project_description,
      start_date,
      end_date,
      project_status
    } = req.body;

    // Count existing projects to generate next ID
    const count = await Project.countDocuments();
    const generatedProjectId = `Pr-${count + 1}`;

    const newProject = new Project({
      project_id: generatedProjectId,
      project_name,
      client_name,
      project_description,
      start_date,
      end_date,
      project_status,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created', project: newProject });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can view projects' });
    }

    const project = await Project.findOne({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can view projects' });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can update projects' });
    }

    const project = await Project.findOne({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    Object.assign(project, req.body);
    await project.save();

    res.status(200).json({ message: 'Project updated', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can delete projects' });
    }

    const project = await Project.findOneAndDelete({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 