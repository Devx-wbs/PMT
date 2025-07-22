const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// API: Add new Employee
exports.addEmployee = async (req, res) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Only owners can add employees' });
  }

  const { name, email, leadMember, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  try {
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already exists for an employee' });
    }

    const lastEmployee = await Employee.findOne({ teamMemberId: { $regex: /^WS-\d+$/ } })
      .sort({ teamMemberId: -1 })
      .collation({ locale: 'en', numericOrdering: true });

    let newIdNumber = 1;
    if (lastEmployee && lastEmployee.teamMemberId) {
      const lastNumber = parseInt(lastEmployee.teamMemberId.split('-')[1]);
      newIdNumber = lastNumber + 1;
    }
    const teamMemberId = `WS-${newIdNumber.toString().padStart(3, '0')}`;

    const autoPassword = crypto.randomBytes(6).toString('hex');
    const hashedPassword = await bcrypt.hash(autoPassword, 10);
    const passwordExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    
    const newEmployee = new Employee({
      name,
      email,
      teamMemberId,
      leadMember,
      role,
      password: hashedPassword,
      passwordExpiresAt,
      addedBy: req.user._id,
    });

    await newEmployee.save();

    await sendEmail(
      email,
      'Welcome to the Team',
      `Hi ${name},

You've been added as an employee in ${req.user.companyName}.

Login Email: ${email}
Password: ${autoPassword}

Note: This is an auto-generated password and it will expire in 5 minutes. Please log in and update your password.`
    );

    res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// API: First Login - Password Update
exports.employeeFirstLogin = async (req, res) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;

  if (!email || !oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const employee = await Employee.findOne({ email });
  if (!employee)
    return res.status(404).json({ message: 'Employee not found' });

  if (employee.passwordExpiresAt && new Date() > employee.passwordExpiresAt) {
    return res.status(403).json({
      message: 'Your temporary password has expired. Please contact the administrator for a new one.'
    });
  }

  if (!employee.mustChangePassword)
    return res.status(400).json({ message: 'Password already updated, use login instead' });

  const isMatch = await bcrypt.compare(oldPassword, employee.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Old password is incorrect' });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: 'New passwords do not match' });

  if (newPassword.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });

  employee.password = await bcrypt.hash(newPassword, 10);
  employee.passwordExpiresAt = null;
  employee.mustChangePassword = false;

  await employee.save();

  res.status(200).json({ message: 'Password updated successfully. Please login.' });
};

// API: Employee Login
exports.employeeLogin = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (confirmPassword !== undefined) {
    return res.status(400).json({ message: 'Do not include confirmPassword during login' });
  }

  try {
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (employee.passwordExpiresAt && new Date() > employee.passwordExpiresAt) {
      return res.status(403).json({
        message: 'Temporary password has expired. Please contact your administrator.'
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    if (employee.mustChangePassword) {
      return res.status(400).json({ message: 'Please update your password before logging in' });
    }

    res.status(200).json({
      message: 'Login successful',
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit employee information using teamMemberId
exports.editEmployee = async (req, res) => {
  const { teamMemberId } = req.params;
  const { name, email, leadMember, role } = req.body;

  if (!teamMemberId) {
    return res.status(400).json({ message: 'teamMemberId is required' });
  }

  try {
    const employee = await Employee.findOne({ teamMemberId });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Optional: Only certain roles (like owner/admin) can update others
    if (req.user.role !== 'owner' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to edit employee' });
    }

    // Update fields if they are provided
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (leadMember !== undefined) employee.leadMember = leadMember;
    if (role) employee.role = role;

    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    console.error('❌ Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
