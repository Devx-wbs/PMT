const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const teamAuthMiddleware = require('../middleware/teamAuthMiddleware');
const { addTeamMember,firstLogin, teamMemberLogin} = require('../controllers/teamController');


router.post('/addTeamMember', authMiddleware, addTeamMember);
router.post('/firstLogin', firstLogin);
router.post('/teamMemberLogin', teamMemberLogin);


module.exports = router;
