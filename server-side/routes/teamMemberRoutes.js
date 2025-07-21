const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const teamAuthMiddleware = require('../middleware/teamAuthMiddleware');
const teamMemberController = require('../controllers/teamMemberController');


router.post('/addTeamMember', authMiddleware, teamMemberController.addTeamMember);
router.post('/firstLogin', teamMemberController.firstLogin);
router.post('/teamMemberLogin', teamMemberController.teamMemberLogin);


module.exports = router;
