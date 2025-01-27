const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://news.google.com/search?q=Apple';

async function fetchNews() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const articles = [];

        $('article').each((index, element) => {
            const title = $(element).find('h3').text();
            const description = $(element).find('.xBbh9').text();
            const link = $(element).find('a').attr('href');

            if (title && description && link) {
                articles.push({
                    title,
                    description,
                    link: `https://news.google.com${link.substring(1)}` // Fix relative link
                });
            }
        });

        return articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

module.exports = fetchNews;
