const express = require('express');
const createJWTMiddleware = require('express-jwt');
const newsController = require('../controllers/news-controller');

const router = express.Router();
const jwtMiddleware = createJWTMiddleware({ secret: 'SECRET_FOR_TOKEN' });

router.get('/', newsController.newsGet);
router.post('/', jwtMiddleware, newsController.newsPost);

module.exports = router;