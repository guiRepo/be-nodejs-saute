import express from 'express';
const app = express();
const PORT = 4000;

app.post('/subscribe', async (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
  }

  try {
    const acRes = await fetch(`${process.env.AC_API_URL}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: { firstName, lastName, email, phone },
      }),
    });

    const data = await acRes.json();
    res.status(acRes.status).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao conectar com ActiveCampaign',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server runnig at http:/localhost:${PORT}`);
})

module.exports();