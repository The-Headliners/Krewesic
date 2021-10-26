const express = require('express');
const { async } = require('regenerator-runtime');
const Conversation = express.Router();
const { Conversations} = require('../../../db/index.js');


Conversation.post('/conversation', async (req, res) => {
 
  const {senderId, receiverId} = req.body;

  try {
    const newConversation = await Conversations.create({
      senderId: senderId, receiverId: receiverId
    });
    res.status(200).send(newConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a conversation of a user
Conversation.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await Conversations.findAll({
      where: {
        senderId: userId,
      }
    });

    const convo = await Conversations.findAll({
      where: {
        receiverId: userId,
      }
    });
    console.log('this is the conversations', conversation, 'if userId is receiverId', convo);
    if (conversation.length === 0) {
      res.status(200).send(convo);
    } else if (convo.length === 0) { 
      res.status(200).send(conversation);
    }
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

module.exports = { Conversation };