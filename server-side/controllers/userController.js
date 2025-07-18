const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Team = require('../models/Team');
const TeamMember = require('../models/TeamMember');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res) => {
    try {
        const { companyName, companyDomain, companyID, companyAddress, founded_year, firstName, lastName, email, password, confirmPassword } = req.body;

        if (!companyName || !companyDomain || !companyID || !companyAddress ||
            !firstName || !lastName || !email || !password || !confirmPassword)
            return res.status(400).json({ message: 'Required fields missing' });

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Passwords do not match' });

        const existingEmail = await User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: 'Email already registered' });

        const existingCompany = await User.findOne({ companyName });
        if (existingCompany)
            return res.status(400).json({ message: 'Company Name already registered' });

        const existingDomain = await User.findOne({ companyDomain });
        if (existingDomain)
            return res.status(400).json({ message: 'Company Domain already registered' });

        const existingID = await User.findOne({ companyID });
        if (existingID)
            return res.status(400).json({ message: 'Company ID already registered' });
        

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ companyName, companyDomain, companyID, companyAddress, founded_year, firstName, lastName, email, password: hashed });
        await newUser.save();

        await sendEmail(
            email,
            '🎉 Registration Successful - Welcome Aboard!',
            `Hello ${companyName},

            Thank you for registering on our platform.

            You are now registered as an "Owner". You can log in and start managing your team.

            Regards,
            TeamTrak`
        );

        res.status(201).json({ message: 'Registered as owner' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: 'Required fields missing' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

        let token = user.token;
        let isTokenValid = false;

        if (token) {
            try {
                jwt.verify(token, 'secret123');
                isTokenValid = true;
            } catch (err) {
                isTokenValid = false;
            }
        }

        if (!isTokenValid) {
            token = jwt.sign({ id: user._id }, 'secret123', { expiresIn: '7d' });
            user.token = token;
            await user.save();
        }

        res.json({ message: 'Login successful', token});
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.update = async (req, res) => {
    try {
        const { companyName, companyDomain, companyAddress,email } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.user._id,
            { companyName, companyDomain, companyAddress, email },
            { new: true }
        ).select('-password');

        res.json({ message: 'Updated', user: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createTeam = async (req, res) => {
  try {
    const { teamName, description, projectName, teamLead, teamMembers } = req.body;

    
    if (!req.user || req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owner can create teams' });
    }

    
    const teamLeadUser = await TeamMember.findOne({ name: teamLead.trim(), role: 'team_Lead' });
    if (!teamLeadUser) {
      return res.status(400).json({ message: 'Provided name is not a valid team lead' });
    }

    // Validate team members
    let memberIds = [];
    if (Array.isArray(teamMembers) && teamMembers.length > 0) {
      const members = await TeamMember.find({
        name: { $in: teamMembers.map(name => name.trim()) },
        role: 'team_Member',
      });

      if (members.length !== teamMembers.length) {
        return res.status(400).json({ message: 'One or more provided team members are invalid' });
      }

      memberIds = members.map(member => member._id);
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

    res.status(201).json({ message: 'Team created successfully', team });

  } catch (err) {
    console.error('Error creating team:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTeam = async (req, res) => {
    try {
        const { teamName } = req.body;

        if (!req.user || req.user.role !== 'owner') {
            return res.status(403).json({ message: 'Only admin can delete teams' });
        }

        if (!teamName) {
            return res.status(400).json({ message: 'Team name is required' });
        }

        const team = await Team.findOne({ teamName: teamName.trim() });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        await Team.deleteOne({ _id: team._id });

        return res.status(200).json({ message: `Team '${teamName}' deleted successfully` });

    } catch (err) {
        console.error('Error deleting team:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.addMember = async (req, res) => {
    try {
        const { teamLeadName, teamName, memberName } = req.body;

        if (!teamLeadName || !teamName || !memberName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const teamLead = await TeamMember.findOne({ name: teamLeadName.trim(), role: 'team_Lead' });
        if (!teamLead) {
            return res.status(403).json({ message: 'Only team leads can add members' });
        }

        const team = await Team.findOne({ teamName: teamName.trim(), teamLead: teamLead._id });
        if (!team) {
            return res.status(404).json({ message: 'Team not found or not owned by this team lead' });
        }

        const memberToAdd = await TeamMember.findOne({ name: memberName.trim(), role: 'team_Member' });
        if (!memberToAdd) {
            return res.status(400).json({ message: 'Provided name is not a valid team_Member' });
        }

        if (team.members.includes(memberToAdd._id)) {
            return res.status(400).json({ message: 'Member already in the team' });
        }

        team.members.push(memberToAdd._id);
        await team.save();

        res.status(200).json({ message: 'Member added to team successfully', team });

    } catch (err) {
        console.error('Error adding team member:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.removeMmember = async (req, res) => {
    try {
        const { teamLeadName, teamName, memberName } = req.body;

        if (!teamLeadName || !teamName || !memberName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

      
        const teamLead = await TeamMember.findOne({ name: teamLeadName.trim(), role: 'team_Lead' });
        if (!teamLead) {
            return res.status(403).json({ message: 'Only team leads can remove members' });
        }

        
        const team = await Team.findOne({ teamName: teamName.trim(), teamLead: teamLead._id });
        if (!team) {
            return res.status(404).json({ message: 'Team not found or not owned by this team lead' });
        }

        
        const memberToRemove = await TeamMember.findOne({ name: memberName.trim(), role: 'team_Member' });
        if (!memberToRemove) {
            return res.status(400).json({ message: 'Provided name is not a valid team_Member' });
        }

        
        if (!team.members.includes(memberToRemove._id)) {
            return res.status(400).json({ message: 'Member is not part of this team' });
        }

        
        team.members = team.members.filter(id => id.toString() !== memberToRemove._id.toString());
        await team.save();

        res.status(200).json({ message: 'Member removed from team successfully', team });

    } catch (err) {
        console.error('Error removing team member:', err);
        res.status(500).json({ message: 'Server error' });
    }
};