const express = require('express');
const { async } = require('regenerator-runtime');
const Message = express.Router();
const {User, Messages} = require('../../../db/index.js');


//Create a message 
Message.post('/sendMessage', async (req, res) => {
  const { conversationId, sender, text} = req.body;
  try {

    Messages.create({ conversationId: conversationId, sender: sender, text: text});
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//get all messages from a certain conversation
Message.get('/allMessages/:conversationId', async (req, res) => {
  const {conversationId} = req.params;
  try {
    const messages = await Messages.findAll({where: { conversationId: conversationId }, include: [{model: User }]});
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
});

module.exports = { Message };