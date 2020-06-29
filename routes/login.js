const express = require('express');
const md5 = require('md5');
const pool = require('../db-connector/pool');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Use POST, Luke!');
})

router.post('/', (req, res) => {
    const { username, password } = req.body;

    pool
        .query(`SELECT * FROM users WHERE username=$1;`, [ username ])
        .then((data) => {
            const returnedTable = data.rows; // Array of records

            // If user doesn't exist in DB we response with error
            if (returnedTable.length === 0) {
                // This return is to exit from function
                return res.send({ error: 'No records found' });
            }

            // And if does:
            // Checking password hashes
            // Building hash for received from request password
            const userFromDb = returnedTable[0];
            const salt = 'SOME_SECRET_HERE';
            const receivedHashedPassword = md5(password + salt);

            const passwordsHashesMatch = userFromDb.password_hash === receivedHashedPassword;

            if (passwordsHashesMatch) {
                const tokenPayload = {
                    firstName: userFromDb.first_name,
                    lastName: userFromDb.last_name,
                    username,
                };

                const secretForToken = 'SECRET_FOR_TOKEN';

                const tokenPayloadAsString = JSON.stringify(tokenPayload); // Convert  payload to JSON string

                // Convert string to base64 encoded string
                const buff = new Buffer(tokenPayloadAsString); // Create new buffer object
                const base64Payload = buff.toString('base64'); // Use buffer object to build first part of the token

                // Build signature for payload
                const signature = md5(base64Payload + secretForToken); // Second part of the token

                // Combine payload and signature to one token
                const detailedInfoAboutUser = `${base64Payload}.${signature}`;

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
