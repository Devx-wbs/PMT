const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const teamAuthMiddleware = require('../middleware/teamAuthMiddleware');
const employeeMiddleware= require('../middleware/employeeMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createTeam', authMiddleware, teamController.createTeam);
router.delete('/deleteTeam', authMiddleware, teamController.deleteTeam);
router.post("/addMember", authMiddleware, teamController.addMember);
router.post("/removeMember", authMiddleware, teamController.removeMember);
router.get("/team-leads", authMiddleware, teamController.getAllTeamLeads);
router.get("/team-members", authMiddleware, teamController.getAllTeamMembers);
// no delete one

module.exports = router;