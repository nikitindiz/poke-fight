const express = require('express');
const router = express.Router();
const pool = require('../db-connector/pool');

// [R] - read
// Public API route
router.get('/', (req, res) => {
    pool
        .query('SELECT * FROM news')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            res.send({ error: err.message });
        });
});

// CRUD         methods:
// C - create   POST
// R - read     GET
// U - update   PUT
// D - delete   DELETE

// Secured route
router.post('/', (req, res) => {
    const { title, brief_text, detailed_text } = req.body;

    pool
        .query(
            'INSERT INTO news (title, brief_text, detailed_text) VALUES ($1, $2, $3)',
            [ title, brief_text, detailed_text ]
        )
        .then(data => {
            res.send(data.rows)
        })
        .catch(err => {
            res.send({ error: err.message })
        });
});

module.exports = router;