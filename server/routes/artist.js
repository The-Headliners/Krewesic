const { Router } = require('express');
const axios = require('axios');
require('dotenv').config();

const artist = Router();

const artistApiUrl = `http://theaudiodb.com/api/v1/json/${process.env.AUDIO_DB_KEY}/search.php?s`;

artist.get('/artistOfTheDay', async(req, res) => {
  try {
    const { data } = await axios.get(artistApiUrl);
    console.log(data);
    res.status(201).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = artist;