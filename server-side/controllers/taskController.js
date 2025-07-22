const Task = require("../models/Task");
const TeamMember = require("../models/Employee");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    const teamMember = await TeamMember.findOne({ teamMemberId: assignedTo });
    if (!teamMember) {
      return res
        .status(404)
        .json({ message: "Assigned team member not found" });
    }

    const newTask = new Task({
      title,
      description,
      assignedTo: teamMember.teamMemberId,
      assignedBy: req.user._id,
      assignedByRole: req.user.role,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task assigned successfully", task: newTask });
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get ongoing tasks for a team member
exports.getOngoingTasks = async (req, res) => {
  const { teamMemberId } = req.params;

  try {
    const tasks = await Task.find({
      assignedTo: teamMemberId,
      status: { $in: ["pending", "in-progress"] },
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching ongoing tasks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get task history (completed tasks)
exports.getTaskHistory = async (req, res) => {
  const { teamMemberId } = req.params;

  try {
    const tasks = await Task.find({
      assignedTo: teamMemberId,
      status: "completed",
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching task history:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const TeamMember = require("../models/Employee");

exports.getAllAssignableTeamMembers = async (req, res) => {
  try {
    const user = req.user;

    let query = {
      role: { $nin: ["owner", "admin"] },
    };

    if (user.role === "team-lead") {
      query.leadMember = user._id;
    }

    const teamMembers = await TeamMember.find(query).select(
      "name email teamMemberId role"
    );

    res.status(200).json(teamMembers);
  } catch (err) {
    console.error("Error fetching team members:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
