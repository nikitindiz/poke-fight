var express = require('express');
const md5 = require('md5');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { authorization = '' } = req.headers;

  const [ payload, signature ] = authorization.replace('Bearer ', '').split('.');

  const calculatedSignature = md5(payload + 'SECRET_FOR_TOKEN');

  if (calculatedSignature === signature) {
    res.send('respond with a resource');
  } else {
    res.send('forbidden');
  }
});

module.exports = router;
