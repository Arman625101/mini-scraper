import https from 'https';
import * as cheerio from 'cheerio';
import { resolve } from 'path';

export function scrapeFeed(url, limit = 10) {
    const feedUrls = [];
    let data = '';
    return new Promise((resolve) => {
        https.get(url, (res) => {
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const $ = cheerio.load(data, {
                    xmlMode: true
                });
                const items = $('channel').find('item');
                items.length = limit;

                items.each((i, el) => {
                    feedUrls.push($(el).find('link').text());
                });

                resolve(feedUrls);
            });
        });
    });
}

export function getArticleData(urls, { url: originUrl, title, date, content }) {
    let data = '';
    const operations = [];
    urls.forEach((url) => {
        operations.push(
            new Promise((resolve) => {
                const { origin } = new URL(originUrl);
                https.get(`${origin}${url}`, (res) => {
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        const $ = cheerio.load(data);

                        resolve({
                            title: $(title).text().trim(),
                            date: $(date).text().trim(),
                            content: $(content).text().trim()
                        });
                    });
                });
            })
        );
    });

    return Promise.all(operations);
}
