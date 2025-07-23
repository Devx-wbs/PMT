const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Project = require('../models/Project');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Parsed token:", token);

  try {
    const decoded = jwt.verify(token, "secret123");
    console.log("Decoded token:", decoded); // ✅ Add this for debug
    
        if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    // Fetch user
    let userType = "user";
    let user = await User.findById(decoded.id).select("-password");

    // If not found, try Employee
    if (!user) {
      user = await Employee.findById(decoded.id).select("-password");
      userType = "employee";
    }

    if (!user){
      console.log("No user found for ID:", decoded.id);
      return res.status(401).json({ message: "User not found." });
    } 

    // ✅ Fix here: use _id instead of id
    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      type: userType,
    };

    if (userType === "employee") {
      req.user.teamMemberId = user.teamMemberId; // Only attach if exists
      }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;