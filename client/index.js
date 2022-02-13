import styles from './style.css';

const form = document.getElementById('form');
const btn = document.getElementById('scrap');

btn.addEventListener('click', (event) => {
    event.preventDefault()
    const formData = new FormData(form);

    const body = {
        url: formData.get('url'),
        element: `.${formData.get('element')}`,
        link: `.${formData.get('link')}`,
        title: `.${formData.get('title')}`,
        date: `.${formData.get('date')}`,
        limit: formData.get('limit')
    };
    fetch('http://localhost:6969/', {
        method: 'POST',
        body: JSON.stringify(body)
    })
        .then(async (res) => {
            const articles = await res.json();

            const articlesList = document.getElementById('articles');
            articlesList.innerHTML = '';
            articles.forEach((article) => {
                articlesList.append(generateArticle(article));
            });
        })
        .catch((err) => console.log);
});

function generateArticle({ date, title, url }) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    const titleElem = document.createElement('h1');
    titleElem.textContent = title;
    const dateElem = document.createElement('p');
    dateElem.textContent = date;
    a.append(titleElem, dateElem);
    li.append(a);

    return li;
}
