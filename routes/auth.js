const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 注册逻辑
router.post('/register', authController.register);
// 登录逻辑
router.post('/login', authController.login);

module.exports = router;