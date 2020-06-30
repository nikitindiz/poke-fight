const md5 = require('md5');
const pool = require('../db-connector/pool');

const newsGet = (req, res) => {
    pool
        .query('SELECT * FROM news')
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            res.send({ error: err.message });
        });
};

const newsPost = (req, res) => {
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
};

module.exports = {
    newsGet,
    newsPost
};