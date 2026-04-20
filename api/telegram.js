export default async function handler(req, res) {

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = "1105509747";

  const text = req.query.text || "🔥 FightSphere Update";

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
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

  res.status(200).json({ ok: true });
}
