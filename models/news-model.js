const pool = require('../db-connector/pool');

const getAllNews = async () => {
    return pool.query('SELECT * FROM news'); // -> new Promise()
};

const createNews = (title, brief_text, detailed_text) => {
    return pool.query(
        'INSERT INTO news (title, brief_text, detailed_text) VALUES ($1, $2, $3)',
        [title, brief_text, detailed_text]
    );
};

const updateNews = () => {};

const deleteNews = () => {};

module.exports = {
    getAllNews,
    createNews,
};