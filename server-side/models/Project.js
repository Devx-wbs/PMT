const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_id: {type: String, required: true, unique: true},
  project_name: { type: String, required: true },
  client_name: { type: String, required: true },
  project_description: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  project_status: {
    type: String,
    enum: ['ongoing', 'completed', 'on hold'],
    default: 'ongoing'
  },
  project_lead: {
    type: String, // Storing teamMemberId instead of ObjectId
    required: true
  },
    team_members: [{
    type: String, // Storing teamMemberId for each member
    required: true,
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);