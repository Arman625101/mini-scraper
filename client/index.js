import styles from './style.css';

const urlInput = document.getElementById('url');
const classNameInput = document.getElementById('className');
const btn = document.getElementById('scrap');

btn.addEventListener('click', () => {
    const body = {
        url: urlInput.value,
        className: classNameInput.value,
        limit: 10
    };
    fetch('http://localhost:6969/', {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(async (res) => {
            const text = await res.text();
            const temp = document.createElement('div');
            temp.id = 'content';
            temp.innerHTML = text;

            const articlesList = document.getElementById('articles-list');
            const articles = temp.getElementsByClassName(classNameInput.value);

            Array.from(articles)
                .slice(0, 10)
                .forEach((article) => {
                    const li = document.createElement('li');
                    const title = document.createElement('h1');
                    const date = document.createElement('p');
                    const link = article.getElementsByClassName('list__link')[0]?.getAttribute('href');

                    li.classList.add('article-item');
                    title.innerText = article.getElementsByClassName('list__title')[0]?.textContent;
                    date.innerText = article.getElementsByClassName('list__date')[0]?.textContent;

                    li.append(title, date);
                    articlesList.append(li);
                });
        })
        .catch((err) => console.log);
});
