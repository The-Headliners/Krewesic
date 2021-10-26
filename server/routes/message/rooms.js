const express = require('express');
const { async } = require('regenerator-runtime');
const Room = express.Router();
const {Rooms} = require('../../../db/index.js');

Room.get('/rooms', async (req, res) => {

  try {

    const rooms = await Rooms.findAll();
    res.status(200).send(rooms);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }

});

module.exports = { Room };