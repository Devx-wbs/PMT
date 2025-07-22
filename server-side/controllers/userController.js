const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// APIs for user(company/owner) - registration, login, update
exports.register = async (req, res) => {
  try {
    const {
      companyName,
      companyDomain,
      companyID,
      companyAddress,
      founded_year,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !companyName ||
      !companyDomain ||
      !companyID ||
      !companyAddress ||
      !founded_year ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingCompany = await User.findOne({ companyName });
    if (existingCompany) {
      return res.status(400).json({ message: "Company already registered" });
    }

    const existingDomain = await User.findOne({ companyDomain });
    if (existingDomain) {
      return res
        .status(400)
        .json({ message: "Company Domain already registered" });
    }

    const existingID = await User.findOne({ companyID });
    if (existingID) {
      return res.status(400).json({ message: "Company ID already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    // Generate employeeID if not provided
    const employeeID = `EMP${Math.floor(Math.random() * 1e12)}`;
    const joinDate = new Date();
    const newUser = new User({
      companyName,
      companyDomain,
      companyID,
      companyAddress,
      founded_year,
      firstName,
      lastName,
      email,
      password: hashed,
      employeeID,
      joinDate,
      accountStatus: "Active",
      emailVerified: true,
      lastLogin: joinDate,
      accountType: "Standard",
    });
    await newUser.save();

    // await sendEmail(
    //   email,
    //   '🎉 Registration Successful - Welcome Aboard!',
    //   `Hello ${companyName},\n\nThank you for registering on our platform.\n\nYou are now registered as an "Owner". You can log in and start managing your team.\n\nRegards,\nTeamTrak`
    // );
    // Email sending temporarily disabled for debugging

    res.status(201).json({ message: "Registered as owner" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const userWithPassword = await User.findOne({ email });
    if (!userWithPassword) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    let token = userWithPassword.token;
    let isTokenValid = false;

    if (token) {
      try {
        jwt.verify(token, "secret123");
        isTokenValid = true;
      } catch (err) {
        isTokenValid = false;
      }
    }

    if (!isTokenValid) {
      token = jwt.sign({ id: userWithPassword._id }, "secret123", {
        expiresIn: "7d",
      });
      userWithPassword.token = token;
      await userWithPassword.save();
    }

    // On login, update lastLogin
    userWithPassword.lastLogin = new Date();
    await userWithPassword.save();

    const { password: _, ...userDetails } = userWithPassword.toObject();

    res.json({
      message: "Login successful",
      token,
      user: userDetails,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    // In update, allow updating new fields
    const {
      companyName,
      companyDomain,
      companyAddress,
      email,
      website,
      industry,
      department,
      accountType,
    } = req.body;

    // Handle companyLogo upload
    let companyLogo;
    if (req.file) {
      companyLogo = `/uploads/companyLogos/${req.file.filename}`;
    }

    const updateFields = {
      companyName,
      companyDomain,
      companyAddress,
      email,
      website,
      industry,
      department,
      accountType,
    };
    if (companyLogo) updateFields.companyLogo = companyLogo;

    const updated = await User.findByIdAndUpdate(req.user._id, updateFields, {
      new: true,
    }).select("-password");

    res.json({ message: "Updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
