const {Router} = require('express');
virtualEvent = Router();
const { v4: uuidV4} = require('uuid');

virtualEvent.get('/concert/:concertId', async(req, res) => {
  try { 
    const {concertId} = req.params;

  } catch (err) {

  }
});

module.exports = virtualEvent;


