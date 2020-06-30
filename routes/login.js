const express = require('express');
const loginController = require('../controllers/login-controller');
const router = express.Router();

router.get('/', loginController.loginGet)
router.post('/', loginController.loginPost);

module.exports = router;
