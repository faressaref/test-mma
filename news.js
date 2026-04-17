document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("news-container");
  const headlines = document.getElementById("headlines");

  // لو الصفحة مش فيها الأخبار، اخرج بهدوء
  if (!container || !headlines) return;

  const apiKey = "96408ebb7ddb487ea3a0b7df3e77e71a";

  const isLocal =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1";

  const url = isLocal
    ? `https://newsapi.org/v2/everything?q=ufc OR pfl OR "mma"&language=en&sortBy=publishedAt&pageSize=30&apiKey=${apiKey}`
    : "/api/news";

  fetch(url)
    .then(res => res.json())
    .then(data => {

      console.log("NEWS DATA:", data); // 👈 دي مهمة لو حصلت مشكلة

      container.innerHTML = "";
      headlines.innerHTML = "";

      const articles = (data.articles || []).filter(a => {

  const text = (a.title + " " + (a.description || "")).toLowerCase();

  // كلمات أساسية MMA
  const keywords = [
    "ufc",
    "pfl",
    "mma",
    "mixed martial arts",
    "fight",
    "fighter",
    "octagon",
    "dana white"
  ];

  // نعد كام كلمة موجودة
  let matches = 0;

  keywords.forEach(word => {
    if (text.includes(word)) matches++;
  });

  // 👇 لو فيه كلمتين أو أكتر → نعرضه
  return matches >= 1;

});

      if (!articles.length) {
        container.innerHTML = "<p style='text-align:center'>❌ No News</p>";
        return;
      }

      articles
        .filter(a => a.title) // 👈 بس نتأكد فيه عنوان
        .slice(0, 20)
        .forEach((a, index) => {

          const image = a.urlToImage || "https://via.placeholder.com/400x200?text=MMA";

          const card = document.createElement("a");
          card.href = a.url;
          card.target = "_blank";
          card.className = "news-card";

          card.innerHTML = `
            <img src="${image}">
            <h3>${a.title}</h3>
          `;

          container.appendChild(card);

          // headlines
          if (index < 8) {
            const li = document.createElement("li");
            li.innerText = a.title;
            li.onclick = () => window.open(a.url);
            headlines.appendChild(li);
          }

        });

    })
    .catch((err) => {
      console.error("ERROR:", err);
      container.innerHTML =
        "<p style='text-align:center'>❌ Failed to load news</p>";
    });

});