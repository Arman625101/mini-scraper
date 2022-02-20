import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import { getArticleData, scrapeFeed } from './utils.js';

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
                const feedUrls = await scrapeFeed(body.url);
                const articles = await getArticleData(feedUrls, body);
                
                res.write(JSON.stringify(articles));
                res.end();
            });
        }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
