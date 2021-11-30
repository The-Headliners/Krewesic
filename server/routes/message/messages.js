const { MessageSharp } = require('@mui/icons-material');
const express = require('express');
const { async } = require('regenerator-runtime');
const Message = express.Router();
const {User, Messages} = require('../../../db/index.js');
const {Op} = require('sequelize')



//get Messages between a user and another user
Message.get('/getMessages/:otherId', async(req, res) => {
  try {
    const {otherId} = req.params;
    const {id} = req.user;
    //console.log('id', id, 'otherId', otherId)

    const sentMessages = await Messages.findAll({where: {
      sender: id,
      receiver: otherId
    }})
    const receivedMessages = await Messages.findAll({where: {
      sender: otherId,
      receiver: id
    }})
    
    const allMessages = [...sentMessages, ...receivedMessages]
   
    allMessages.sort((messageA, messageB) => messageA.id - messageB.id)
    //need to sort these by message id--> that will be oldest to newest
   // console.log('all messages', allMessages)
    res.status(200).send(allMessages)

  } catch (err) {
    console.warn('err', err)
    res.sendStatus(500)
  }
})

Message.post('/postMessage', async(req, res) => {
  try {
    const {id} = req.user;
    
    console.log('req body', req.body)
    await Messages.create(req.body)
    res.sendStatus(200)

  } catch (err) {
    console.warn(err)
    res.sendStatus(500)
  }
})

//Create a message
Message.post('/sendMessage/:id', async (req, res) => {
  //current user id
  const {id} = req.params;
  const { conversationId, sender, text, name} = req.body;
  try {

    Messages.create({ conversationId: conversationId, sender: sender, text: text, name: name, UserId: id});
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
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
    console.warn(err);
    res.sendStatus(500);

  }
});


module.exports = { Message };