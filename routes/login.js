const express = require('express');
const md5 = require('md5');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Use POST, Luke!');
})

router.post('/', (req, res) => {
    const dbValues = {
        username: 'admin',
        password_hash: 'b9f8804c5c4cc5845c1fb1cbc24feb3e'
    };

    const detailedInfoAboutUser = {
        firstName: 'Alex',
        lastName: 'Nikitin',
        secretToken: 'Secret!!!!!'
    };

    const salt = 'SOME_SECRET_HERE';
    const receivedHashedPassword = md5(req.body.password + salt);

    if (
        dbValues.password_hash === receivedHashedPassword &&
        dbValues.username === req.body.username
    ) {
        res.send(detailedInfoAboutUser);
    } else {
        res.send({ error: 'Failed' });
    }
});

module.exports = router;
