const express = require('express');
const { async } = require('regenerator-runtime');
const Upload = express.Router();
const {User, MusicUpload} = require('../../../db/index.js');

Upload.post('/musicUpload', async (req, res) => {
  const { id } = req.user;
  const {fileUrl, is_audio} = req.body;
  try {

    const music = MusicUpload.create({fileUrl: fileUrl, is_audio: is_audio, UserId: id});
    res.status(200).send(music);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }

});

//get all music from the current user
Upload.get('/musicUpload', async (req, res) => {
  const { id } = req.user;
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