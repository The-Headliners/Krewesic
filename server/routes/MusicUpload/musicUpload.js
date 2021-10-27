const express = require('express');
const { async } = require('regenerator-runtime');
const Upload = express.Router();
const {User, MusicUpload} = require('../../../db/index.js');

Upload.post('/musicUpload/:id', async (req, res) => {
  const { id } = req.params;
  const {fileUrl} = req.body;
  try {

    const music = MusicUpload.create({fileUrl: fileUrl, UserId: id});
    res.status(200).send(music);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }

});

//get all music from the current user
Upload.get('/musicUpload/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const music = await User.findAll({
      where: {
        id: id,
      },
      include: [{model: MusicUpload}]
    });
    res.json(music);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }

});
module.exports = { Upload };