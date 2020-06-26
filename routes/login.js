const express = require('express');
const { Pool } = require('pg');
const md5 = require('md5');

// 	postgres://rdvnbpfq:Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA@ruby.db.elephantsql.com:5432/rdvnbpfq
const pool = new Pool({
    user: 'rdvnbpfq',
    host: 'ruby.db.elephantsql.com',
    database: 'rdvnbpfq',
    password: 'Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA',
    port: 5432,
});


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Use POST, Luke!');
})

router.post('/', (req, res) => {
    const { username, password } = req.body;

    pool
        .query(`SELECT * FROM users WHERE username='${username}';`)
        .then((data) => {
            const returnedTable = data.rows; // Array of records

            if (returnedTable.length === 0) {
                // This return is to exit from function
                return res.send({ error: 'No records found' });
            }

            const userFromDb = returnedTable[0];

            const tokenPayload = {
                firstName: userFromDb.first_name,
                lastName: userFromDb.last_name,
            };

            const secretForToken = 'SECRET_FOR_TOKEN';

            const tokenPayloadAsString = JSON.stringify(tokenPayload);
            const buff = new Buffer(tokenPayloadAsString);
            const base64Payload = buff.toString('base64'); // First part of the token
            const signature = md5(base64Payload + secretForToken); // Second part of the token

            const detailedInfoAboutUser = `${base64Payload}.${signature}`;

            // Building hash for received from request password
            const salt = 'SOME_SECRET_HERE';
            const receivedHashedPassword = md5(password + salt);

            const passwordsHashesMatch = userFromDb.password_hash === receivedHashedPassword;

            if (passwordsHashesMatch) {
                res.send({ error: null, token: detailedInfoAboutUser });
            } else {
                res.send({ error: 'Failed' });
            }
        })
        .catch(err => {
            res.send({ error: err.message });
        });
});

module.exports = router;
