const express = require('express');
const { async } = require('regenerator-runtime');
const Users = express.Router();
const {User, Messages} = require('../../../db/index.js');




//get a user by google id
Users.get('/usersId/:googleId', async (req, res) => {
  const {googleId} = req.params;
  try {
    const users = await User.findAll({where: {googleId: googleId}});
    res.status(200).send(users);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);

  }
});



//get user by name
Users.get('/users/:user', async (req, res) => {
  const {user} = req.params;
  try {
    const users = await User.findAll({where: {name: user}});
    res.status(200).send(users);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);

  }
});

Users.get('/users', async (req, res) => {

  try {
    const users = await User.findAll({include: [{model: Messages}]});
    res.status(200).send(users);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);

  }
});
module.exports = { Users };