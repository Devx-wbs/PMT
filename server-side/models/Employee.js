const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teamMemberId: { type: String, required: true, unique: true }, // ✅ Renamed
  leadMember: { type: String }, // You can rename this too if needed
  mustChangePassword: { type: Boolean, default: true },
  passwordExpiresAt: { type: Date, default: () => Date.now() + 5 * 60 * 1000 },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: { type: String, default: "employee" }, // ✅ Updated role
  token: { type: String },
  location: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
