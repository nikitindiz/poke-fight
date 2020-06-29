const express = require('express');
const md5 = require('md5');
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

    // console.log(req.headers.authorization)

    if (!req.headers.authorization) {
        return res.send({ error: 'Unauthorized' })
    }

    const [ encodedPayload, signature ] = req.headers.authorization.replace('Bearer ', '').split('.');

    const secretForToken = 'SECRET_FOR_TOKEN';
    const generatedSignature = md5(encodedPayload + secretForToken); // Second part of the token

    if (signature === generatedSignature) {
        // here we would also check if user from encodedPayload
        // is allowed to post the data

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
    } else {
        res.send({ error: 'Something wrong with auth' })
    }
});

module.exports = router;