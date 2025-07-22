const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Employee = require
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
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found." });
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
