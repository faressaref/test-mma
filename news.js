const container = document.getElementById("news-container");
const headlines = document.getElementById("headlines");

const apiKey = "96408ebb7ddb487ea3a0b7df3e77e71a";

const isLocal =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1";

const url = isLocal
  ? `https://newsapi.org/v2/everything?q=ufc OR mma&pageSize=10&apiKey=${apiKey}`
  : "/api/news";

fetch(url)
  .then(res => res.json())
  .then(data => {

    container.innerHTML = "";
    headlines.innerHTML = "";

    const articles = data.articles || data.items;

    if (!articles) {
      container.innerHTML = "<p style='text-align:center'>❌ No News</p>";
      return;
    }

    articles
      .filter(a => a.urlToImage || a.thumbnail)
      .slice(0, 10)
      .forEach((a, index) => {

        const image = a.urlToImage || a.thumbnail;

        const card = document.createElement("a");
        card.href = a.url || a.link;
        card.target = "_blank";
        card.className = "news-card";

        card.innerHTML = `
          <img src="${image}">
          <h3>${a.title}</h3>
        `;

        container.appendChild(card);

        if (index < 6) {
          const li = document.createElement("li");
          li.innerText = a.title;
          li.onclick = () => window.open(a.url || a.link);
          headlines.appendChild(li);
        }

      });

  })
  .catch(() => {
    container.innerHTML =
      "<p style='text-align:center'>❌ Failed to load news</p>";
  });