import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        if (req.url === '/') {
            const data = [];
            req.on('data', (chunk) => {
                data.push(chunk);
            });

            req.on('end', async () => {
                const body = JSON.parse(data);
                res.end(JSON.stringify(await getHtml(body)));
            });
        }
    }
});

function getHtml({ element, limit, url, title, link, date }) {
    const { origin } = new URL(url);
    const articles = [];
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const $ = cheerio.load(data);
                $(element, data).each(function () {
                    const titleText = $(this).find(title).text();
                    const urlText = `${origin}${$(this).find(link).attr('href')}`;
                    const dateText = $(this).find(date).text();
                    if (limit > 0 && titleText.length) {
                        articles.push({ title: titleText, url: urlText, date: dateText });
                        limit -= 1;
                    } else {
                        if (titleText.length) {
                            return false;
                        }
                    }
                });
                resolve(articles);
            });
        });
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
