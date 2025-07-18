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
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);