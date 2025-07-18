const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    description: { type: String },
    projectName: { type: String, required: true }, 
    teamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true , default:null},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', teamSchema);
