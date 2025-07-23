const Project = require("../models/Project");
const Employee = require("../models/Employee");
const Activity = require("../models/Activity");

exports.createProject = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owner can add projects" });
    }

    const {
      project_name,
      client_name,
      project_description,
      start_date,
      end_date,
      project_lead, // teamMemberId of the project lead
      project_status,
    } = req.body;

    // Count existing projects to generate next ID
    const count = await Project.countDocuments();
    const generatedProjectId = `Pr-${count + 1}`;

    console.log("🔍 Looking for project lead:", project_lead);

    const employees = await Employee.find();
    console.log(
      "🧾 All employees teamMemberIds:",
      employees.map((e) => e.teamMemberId)
    );

    // Vaidate Team Lead
    const lead = await Employee.findOne({ teamMemberId: project_lead });
    if (!lead) {
      return res.status(404).json({ message: "Team Lead not found" });
    }

    const newProject = new Project({
      project_id: generatedProjectId,
      project_name,
      client_name,
      project_description,
      start_date,
      end_date,
      project_lead: lead.teamMemberId,
      project_status,
    });

    await newProject.save();
    await Activity.create({
      type: "Project",
      action: "add",
      name: newProject.project_name,
      description: `Created project ${newProject.project_name}`,
      performedBy: req.user?.firstName || req.user?.name || "Unknown",
    });
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owner can view projects" });
    }

    const project = await Project.findOne({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owner can view projects" });
    }

    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can update projects" });
    }

    const project = await Project.findOne({ project_id: req.params.projectId });
    if (!project) return res.status(404).json({ message: "Project not found" });

    Object.assign(project, req.body);
    await project.save();
    await Activity.create({
      type: "Project",
      action: "edit",
      name: project.project_name,
      description: `Edited project ${project.project_name}`,
      performedBy: req.user?.firstName || req.user?.name || "Unknown",
    });

    res.status(200).json({ message: "Project updated", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only owner can delete projects" });
    }

    const project = await Project.findOneAndDelete({
      project_id: req.params.projectId,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    await Activity.create({
      type: "Project",
      action: "delete",
      name: project.project_name,
      description: `Deleted project ${project.project_name}`,
      performedBy: req.user?.firstName || req.user?.name || "Unknown",
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
