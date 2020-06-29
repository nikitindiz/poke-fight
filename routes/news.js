const express = require('express');
const router = express.Router();
const pool = require('../db-connector/pool');

// Public API route
router.get('/', (req, res) => {
    pool.query('SELECT * FROM news')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            res.send({ error: err.message });
        });
});

// Secured route
router.post('/', (req, res) => {
    res.send('Posted');
});

module.exports = router;