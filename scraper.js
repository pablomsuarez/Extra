const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/news', async (req, res) => {
    const companyName = req.query.company || 'Apple';
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(companyName)}&hl=en-US&gl=US&ceid=US:en`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data, { xmlMode: true });
        const articles = [];

        $('item').each((index, element) => {
            const title = $(element).find('title').text();
            const description = $(element).find('description').text();
            const link = $(element).find('link').text();

            if (title && description && link) {
                articles.push({
                    title,
                    description,
                    link
                });
            }
        });

        res.json(articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Error fetching news' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
