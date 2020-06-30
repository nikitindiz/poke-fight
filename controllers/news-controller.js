const md5 = require('md5');
const newsModel = require('../models/news-model');

const newsGet = async (req, res) => {
    try {
        const data = await newsModel.getAllNews();
        res.send(data.rows);
    } catch (err) {
        res.send({ error: err.message });
    }
};

const newsPost = async (req, res) => {
    const { title, brief_text, detailed_text } = req.body;

    console.log(req.user);

    if (req.user.username === 'admin') {
        try {
            const data = await newsModel.createNews(title, brief_text, detailed_text);

            res.send(data.rows)
        } catch(err) {
            res.send({ error: err.message })
        }
    } else {
        res.send({ err: 'You are not allowed to post data' });
    }
};

module.exports = {
    newsGet,
    newsPost
};