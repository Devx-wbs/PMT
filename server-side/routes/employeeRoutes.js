const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const employeeMiddleware = require('../middleware/employeeMiddleware');
const employeeController = require('../controllers/employeeController');

router.post('/addEmployee', authMiddleware, employeeController.addEmployee);
router.post('/employeeFirstLogin', employeeController.employeeFirstLogin);
router.post('/employeeLogin', employeeController.employeeLogin);
router.put('/editEmployee/:teamMemberId', authMiddleware, employeeController.editEmployee);


module.exports = router;