const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

//Endpoint to list countries

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
})