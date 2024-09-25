const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

// Endpoint to list countries
app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Error searching for countries' })
  }
})

// Endpoint for country details
app.get('/country/:code', async (req, res) => {
  const { code } = req.params;

  try {
    let countryInfo, populationData, flagData;

    // Search countryInfo with ISO code
    try {
      countryInfo = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`);
    } catch (err) {
      console.error('Error when fetching countryInfo:', err.message);
      return res.status(500).json({ error: 'Error when feching country info.' });
    }

    // Using the full name of the country to search for population data
    const countryName = countryInfo.data.commonName;

    // Search populationData with country name
    try {
      populationData = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
        country: countryName,
      });
    } catch (err) {
      console.error('Error when fetching populationData:', err.message);
      return res.status(404).json({ error: 'Population data not found.' });
    }
    // Search flagData with ISO2 code
    try {
      flagData = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
        iso2: code.toUpperCase(),
      });
    } catch (err) {
      console.error('Error when fetching flagData:', err.message);
    }

    // Return the consolidated response
    res.json({
      country: countryName,
      borders: countryInfo.data.borders.map(border => border.commonName),
      population: populationData.data.data.populationCounts,
      flag: flagData ? flagData.data.data.flag : '',
    });
  } catch (error) {
    console.error('Error detected:', error.message);
    res.status(500).json({ error: 'Error when fetching country information.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
})