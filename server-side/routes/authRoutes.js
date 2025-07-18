module.exports = router;

    const express = require('express');
    const router = express.Router();
    const userController = require('../controllers/userController');
    const authMiddleware = require('../middleware/authMiddleware');

    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.post('/update', authMiddleware, userController.update);
    router.post('/createTeam', authMiddleware, userController.createTeam);
    router.delete('/deleteTeam', authMiddleware, userController.deleteTeam);
    router.post("/addMember", authMiddleware, userController.addMember);
    router.post("/addMember", authMiddleware, userController.addMember);


    module.exports = router;