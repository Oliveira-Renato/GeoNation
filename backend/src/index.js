const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

//Endpoint to list countries
app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error searching for countries' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
})