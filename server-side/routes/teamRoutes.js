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
// no delete one

module.exports = router;