export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { firstName, lastName, email, phone } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
  }

  try {
    const acRes = await fetch(`${process.env.AC_API_URL}/api/3/contacts`, {
      method: 'POST',
      headers: {
        'Api-Token': process.env.AC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contact: { firstName, lastName, email, phone }
      })
    });

    const data = await acRes.json();
    res.status(acRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar com ActiveCampaign', details: error.message });
  }
}