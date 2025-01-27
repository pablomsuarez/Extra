const express = require('express');
const fetchNews = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/news', async (req, res) => {
    const articles = await fetchNews();
    res.json(articles);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
