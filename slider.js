const apiKey = "96408ebb7ddb487ea3a0b7df3e77e71a";

const slidesContainer = document.getElementById("slides");

let currentIndex = 0;
let slides = [];

fetch(`https://newsapi.org/v2/everything?q=ufc OR mma&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`)
.then(res => res.json())
.then(data => {

  if (data.status !== "ok") return;

  // 🧠 نفلتر الأخبار اللي فيها صور بس
  slides = data.articles.filter(a => a.urlToImage);

  slides.forEach(article => {
    const slide = document.createElement("a");
    slide.href = article.url;
    slide.target = "_blank";
    slide.className = "slide";

    slide.innerHTML = `
      <img src="${article.urlToImage}">
      <div class="slide-title">${article.title}</div>
    `;

    slidesContainer.appendChild(slide);
  });

  startSlider();
});

function startSlider() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 4000);
}