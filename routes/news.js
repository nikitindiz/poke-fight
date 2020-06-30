const express = require('express');
const newsController = require('../controllers/news-controller');

const router = express.Router();

// [R] - read
// Public API route
router.get('/', newsController.newsGet);

// CRUD         methods:
// C - create   POST
// R - read     GET
// U - update   PUT
// D - delete   DELETE

// Secured route
router.post('/', newsController.news);

module.exports = router;