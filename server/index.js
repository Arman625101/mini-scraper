import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;
const url = `${process.env.HOST}:${process.env.PORT}`;

const server = http.createServer(async (req, res) => {
    let result;
    res.setHeader('Access-Control-Allow-Origin', `*`);
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'POST') {
        if (req.url === '/') {
            const data = [];
            req.on('data', (chunk) => {
                data.push(chunk);
            });

            req.on('end', async () => {
                const { url } = JSON.parse(data);
                result = await getHtml(url);
                res.end(result);
            });
        }
    }
});

function getHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
    });
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${url}/`);
});
