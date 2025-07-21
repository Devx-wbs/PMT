const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateUser } = require('../middleware/auth');
const { checkTaskAccess } = require('../middleware/taskAuthMiddleware');

// Protected routes with JWT
router.post('/create', authenticateUser, taskController.createTask);

// Get ongoing tasks for teamMemberId
router.get('/ongoing/:teamMemberId', authenticateUser, checkTaskAccess, taskController.getOngoingTasks);

// Get task history for teamMemberId
router.get('/history/:teamMemberId', authenticateUser, checkTaskAccess, taskController.getTaskHistory);

// Get all tasks for a team member
router.get('/assignable-members', authenticateUser, taskController.getAllAssignableTeamMembers);

module.exports = router;