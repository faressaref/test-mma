export default async function handler(req, res) {

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = "-1003918593635";  

  const text = req.query.text || "🔥 FightSphere Update";

  try {
    const tg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });

    const data = await tg.json();

    res.status(200).json({
      ok: true,
      telegram_response: data
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
