const apiKey = "96408ebb7ddb487ea3a0b7df3e77e71a";

fetch(`https://newsapi.org/v2/everything?q=ufc OR mma&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`)
.then(res => res.json())
.then(data => {

  const slider = document.getElementById("news-slider");

  data.articles.forEach(article => {

    if (!article.urlToImage) return;

    const item = document.createElement("a");
    item.href = article.url;
    item.target = "_blank";
    item.className = "slide";

    item.innerHTML = `
      <img src="${article.urlToImage}">
      <div class="slide-title">${article.title}</div>
    `;

    slider.appendChild(item);

  });

});