const Team = require("../models/Team");
const Employee = require("../models/Employee");

// APIs for createTeam, deleteTeam, addMember, removeMember
exports.createTeam = async (req, res) => {
  try {
    const { teamName, description, projectName, teamLead, teamMembers } =
      req.body;

    if (!req.user || req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owner can create teams" });
    }

    // Validate team lead using teamMemberId and role
    const teamLeadUser = await Employee.findOne({
      teamMemberId: teamLead.trim(),
      role: "team_lead",
    });
    if (!teamLeadUser) {
      return res
        .status(400)
        .json({ message: "Provided teamMemberId is not a valid team lead" });
    }

    // Validate team members using teamMemberId and role
    let memberIds = [];
    if (Array.isArray(teamMembers) && teamMembers.length > 0) {
      const members = await Employee.find({
        teamMemberId: { $in: teamMembers.map((id) => id.trim()) },
        role: "team_member",
      });

      if (members.length !== teamMembers.length) {
        return res.status(400).json({
          message:
            "One or more provided teamMemberIds are invalid or not team members",
        });
      }

      memberIds = members.map((member) => member._id);
    }

    // Create the team
    const team = await Team.create({
      teamName,
      description,
      projectName,
      createdBy: req.user._id,
      teamLead: teamLeadUser._id,
      members: memberIds,
    });

    res.status(201).json({ message: "Team created successfully", team });
  } catch (err) {
    console.error("Error creating team:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { teamName } = req.body;

    if (!req.user || req.user.role !== "owner") {
      return res.status(403).json({ message: "Only admin can delete teams" });
    }

    if (!teamName) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const team = await Team.findOne({ teamName: teamName.trim() });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    await Team.deleteOne({ _id: team._id });

    return res
      .status(200)
      .json({ message: `Team '${teamName}' deleted successfully` });
  } catch (err) {
    console.error("Error deleting team:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { teamLeadName, teamName, memberName } = req.body;

    if (!teamLeadName || !teamName || !memberName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teamLead = await Employee.findOne({
      name: teamLeadName.trim(),
      role: "teamLead",
    });
    if (!teamLead) {
      return res
        .status(403)
        .json({ message: "Only team leads can add members" });
    }

    const team = await Team.findOne({
      teamName: teamName.trim(),
      teamLead: teamLead._id,
    });
    if (!team) {
      return res
        .status(404)
        .json({ message: "Team not found or not owned by this team lead" });
    }

    const memberToAdd = await Employee.findOne({
      name: memberName.trim(),
      role: "teamMember",
    });
    if (!memberToAdd) {
      return res
        .status(400)
        .json({ message: "Provided name is not a valid team_Member" });
    }

    if (team.members.includes(memberToAdd._id)) {
      return res.status(400).json({ message: "Member already in the team" });
    }

    team.members.push(memberToAdd._id);
    await team.save();

    res
      .status(200)
      .json({ message: "Member added to team successfully", team });
  } catch (err) {
    console.error("Error adding team member:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { teamLeadName, teamName, memberName } = req.body;

    if (!teamLeadName || !teamName || !memberName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teamLead = await TeamMember.findOne({
      name: teamLeadName.trim(),
      role: "team_Lead",
    });
    if (!teamLead) {
      return res
        .status(403)
        .json({ message: "Only team leads can remove members" });
    }

    const team = await Team.findOne({
      teamName: teamName.trim(),
      teamLead: teamLead._id,
    });
    if (!team) {
      return res
        .status(404)
        .json({ message: "Team not found or not owned by this team lead" });
    }

    const memberToRemove = await TeamMember.findOne({
      name: memberName.trim(),
      role: "team_Member",
    });
    if (!memberToRemove) {
      return res
        .status(400)
        .json({ message: "Provided name is not a valid team_Member" });
    }

    if (!team.members.includes(memberToRemove._id)) {
      return res
        .status(400)
        .json({ message: "Member is not part of this team" });
    }

    team.members = team.members.filter(
      (id) => id.toString() !== memberToRemove._id.toString()
    );
    await team.save();

    res
      .status(200)
      .json({ message: "Member removed from team successfully", team });
  } catch (err) {
    console.error("Error removing team member:", err);
    res.status(500).json({ message: "Server error" });
  }
};
