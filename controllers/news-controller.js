const newsModel = require('../models/news-model');
// Read
const newsGet = async (req, res) => {
    try {
        const data = await newsModel.getAllNews();
        res.send(data.rows);
    } catch (err) {
        res.send({ error: err.message });
    }
};

// Create
const newsPost = async (req, res) => {
    const { title, brief_text, detailed_text } = req.body;

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

// Update
const newsPut = async (req, res) => {}

// Delete
const newsDelete = async (req, res) => {}

module.exports = {
    newsGet,
    newsPost
};