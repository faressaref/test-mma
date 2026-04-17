const slider = document.getElementById("news-slider");

if (slider) {

  fetch("/api/news")
    .then(res => res.json())
    .then(data => {

      const articles = data.items || [];

      articles.forEach(article => {

        const image = article.thumbnail || "https://via.placeholder.com/400";

        const item = document.createElement("a");
        item.href = article.link;
        item.target = "_blank";
        item.className = "slide";

        item.innerHTML = `
          <img src="${image}">
          <div class="slide-title">${article.title}</div>
        `;

        slider.appendChild(item);

      });

    });

}