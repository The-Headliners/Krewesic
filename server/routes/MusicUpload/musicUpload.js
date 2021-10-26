const express = require('express');
const { async } = require('regenerator-runtime');
const Upload = express.Router();
const {MusicUpload} = require('../../../db/index.js');

Upload.post('/musicUpload/:id', async (req, res) => {
  const { id } = req.params;
  const {fileUrl} = req.body;
  try {

    const music = MusicUpload.create({fileUrl: fileUrl, UserId: id});
    res.status(200).send(music);
  } catch (err) {
    res.sendStatus(500);
  }

});

module.exports = { Upload };