const slidesContainer = document.getElementById("slides");

let currentIndex = 0;
let slides = [];

if (slidesContainer) {

  fetch("/api/news")
    .then(res => res.json())
    .then(data => {

      slides = (data.items || []).filter(a => a.title);

      slides.forEach(article => {

        const image = article.thumbnail || "https://via.placeholder.com/400";

        const slide = document.createElement("a");
        slide.href = article.link;
        slide.target = "_blank";
        slide.className = "slide";

        slide.innerHTML = `
          <img src="${image}">
          <div class="slide-title">${article.title}</div>
        `;

        slidesContainer.appendChild(slide);
      });

      startSlider();
    });

}

function startSlider() {
  setInterval(() => {
    if (!slides.length) return;
    currentIndex = (currentIndex + 1) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, 4000);
}