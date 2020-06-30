const express = require('express');
const createJWTMiddleware = require('express-jwt');
const newsController = require('../controllers/news-controller');

const router = express.Router();
const jwtMiddleware = createJWTMiddleware({ secret: 'SECRET_FOR_TOKEN' });

// [R] - read
// Public API route
router.get('/', newsController.newsGet);

// CRUD         methods:
// C - create   POST
// R - read     GET
// U - update   PUT
// D - delete   DELETE

// Secured route
router.post('/', jwtMiddleware, newsController.newsPost);

module.exports = router;