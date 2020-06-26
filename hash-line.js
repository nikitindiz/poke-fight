const md5 = require('md5');

// 1. They cannot be reversed
// 2. Hash function always produces line with the same number of elements
// console.log( md5('12345') );

const passwordToHash = process.argv[2];

const salt = 'SOME_SECRET_HERE';

console.log( md5(passwordToHash + salt) );
