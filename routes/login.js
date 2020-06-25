const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Use POST, Luke!');
})

router.post('/', (req, res) => {
    const dbValues = {
        username: 'admin',
        password: '12345'
    };

    const detailedInfoAboutUser = {
        firstName: 'Alex',
        lastName: 'Nikitin',
        secretToken: 'Secret!!!!!'
    };

    console.log(req.body)
    // console.log(req.body.username)

    if (
        dbValues.password === req.body.password &&
        dbValues.username === req.body.username
    ) {
        res.send(detailedInfoAboutUser);
    } else {
        res.send({ error: 'Failed' });
    }
});

module.exports = router;
