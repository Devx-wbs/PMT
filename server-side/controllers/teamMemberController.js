// controllers/teamMemberController.js
const {addTeamMember} = require('../models/TeamMember');
const TeamMember = require('../models/TeamMember');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

//APIs for addTeamMember, firstLogin, teamMemberLogin
exports.addTeamMember = async (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Only owners can add team members' });
  }

  const { name, email, leadMember, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: 'Email already exists for a team member' });
    }

    const lastMember = await TeamMember.findOne({ teamMemberId: { $regex: /^WS-\d+$/ } })
      .sort({ teamMemberId: -1 })
      .collation({ locale: 'en', numericOrdering: true });

    let newIdNumber = 1;
    if (lastMember && lastMember.teamMemberId) {
      const lastNumber = parseInt(lastMember.teamMemberId.split('-')[1]);
      newIdNumber = lastNumber + 1;
    }
    const teamMemberId = `WS-${newIdNumber.toString().padStart(3, '0')}`;


    const autoPassword = crypto.randomBytes(6).toString('hex');
    console.log('Generated password:', autoPassword);
    const hashedPassword = await bcrypt.hash(autoPassword, 10);

    const expiresInMinutes = 1;
    const passwordExpiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

    const newMember = new TeamMember({
      name,
      email,
      teamMemberId,
      leadMember,
      role,
      password: hashedPassword,
      passwordExpiresAt,
      addedBy: req.user._id,
    });

    await newMember.save();

    await sendEmail(
      email,
      'Welcome to the Team',
      `Hi ${name},

You've been added as a team member in ${req.user.companyName}.

Login Email: ${email}
Password: ${autoPassword}

Note: This is an auto-generated password and it will expire in 5 minutes. Please log in and update your password.`
    );

    res.status(201).json({ message: 'Team member added successfully', member: newMember });
  } catch (err) {
    console.error('Error adding team member:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.firstLogin = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  if (!email || !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const member = await TeamMember.findOne({ email });
  if (!member)
    return res.status(404).json({ message: 'Team member not found' });

  if (member.passwordExpiresAt && new Date() > member.passwordExpiresAt) {
    return res.status(403).json({
      message: 'Your temporary password has expired. Please contact the administrator for a new one.'
    });
  }

  if (!member.mustChangePassword)
    return res.status(400).json({ message: 'Password already updated, use login instead' });

  const isMatch = await bcrypt.compare(oldPassword, member.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Old password is incorrect' });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: 'New passwords do not match' });

  if (newPassword.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });

  member.password = await bcrypt.hash(newPassword, 10);
  member.passwordExpiresAt = null;
  member.mustChangePassword = false;

  await member.save();

  res.status(200).json({ message: 'Password updated successfully. Please login.' });
};


exports.teamMemberLogin = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (confirmPassword !== undefined) {
    return res.status(400).json({ message: 'Do not include confirmPassword during login' });
  }

  try {
    const member = await TeamMember.findOne({ email });
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (member.passwordExpiresAt && new Date() > member.passwordExpiresAt) {
      return res.status(403).json({
        message: 'Temporary password has expired. Please contact your administrator.'
      });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    if (member.mustChangePassword) {
      return res.status(400).json({ message: 'Please update your password before logging in' });
    }

    // const token = jwt.sign({ id: member._id, role: member.role }, process.env.JWT_SECRET || 'secret123', {
    //   expiresIn: '8h',
    // });

    // member.token = token;
    // await member.save();

    res.status(200).json({
      message: 'Login successful', 
      // token,
      member: {
        id: member._id,
        name: member.name,
        email: member.email,
        role: member.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};