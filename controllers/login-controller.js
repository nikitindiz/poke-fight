const md5 = require('md5');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user-model');

const loginPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await userModel.getUserByUsername(username);

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
            const token = jwt.sign(tokenPayload, secretForToken); // issue the jwt token

            res.send({ error: null, token });
        } else {
            res.send({ error: 'Failed' });
        }
    } catch(err) {
        res.send({ error: err.message });
    }
};

const loginGet = (req, res) => {
    res.send('Use POST, Luke!');
};

module.exports = {
    loginPost,
    loginGet
};