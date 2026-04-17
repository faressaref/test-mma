export default async function handler(req, res) {
  try {

    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.mmafighting.com/rss/current"
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to load news" });
  }
}