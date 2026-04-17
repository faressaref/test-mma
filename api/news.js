export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=ufc OR pfl OR \"mixed martial arts\"&language=en&sortBy=publishedAt&pageSize=50",
      {
        headers: {
          "X-Api-Key": "96408ebb7ddb487ea3a0b7df3e77e71a"
        }
      }
    );

    const data = await response.json();

    // 👇 فلترة من السيرفر (أقوى من الفرونت)
    const filtered = (data.articles || []).filter(a => {

      const text = (a.title + " " + (a.description || "")).toLowerCase();

      return (
        text.includes("ufc") ||
        text.includes("pfl") ||
        text.includes("mma") ||
        text.includes("fight")
      );

    });

    res.status(200).json({
      articles: filtered
    });

  } catch (error) {
    res.status(500).json({ error: "failed to load news" });
  }
}
