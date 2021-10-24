const {Router} = require('express');
const kEvents = Router();
const {Event, User, EventComment} = require('../../../db');
require('dotenv').config();

kEvents.get('/allevents', async(req, res) => {
  try {
    //retrieve the events of krewesic users
    const events = await Event.findAll({limit: 10, include: [{model: User, }]});
    res.status(201).send(events);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

kEvents.get('/virtualevents', async(req, res) => {
  try {
    //retrieve the virtual events of krewesic users
    const events = await Event.findAll({where: {medium: 'virtual'}, 
      limit: 10,
      include: [{model: User, }]
    });
    res.status(201).send(events);
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

kEvents.get('/liveevents', async(req, res) => {
  try {
    //retrieve the events of krewesic users
    const events = await Event.findAll({where: {medium: 'venue'}, limit: 10, include: [{model: User, }]});
    res.status(201).send(events);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

kEvents.get('/event/:eventId', async(req, res) => {
  try {
    
    const {eventId} = req.params;
    //const eventId = 1; //hard coded jsut for testing.  CHANGE THIS!
    console.log('event eventid', eventId);
    const event = await Event.findOne({where: {id: eventId}, include: [{model: User}]});
    res.status(201).send(event);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//post req for comments on the event landing page
kEvents.post('/postcomment', async(req, res) => {
  try {
    console.log('post event comment req');
    
    //const eventId = 1; //hardcoded for testing, change this
    const {id} = req.user;
    const {comment, eventId} = req.body;
    //const id = 1; //hardcoded for testing! chagne this!
    const event = await Event.findByPk(eventId);

    await EventComment.create({
      userId: id,
      text: comment,
      type: 'text',
      eventId: eventId
    });
    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

});

//get req for comments wall on event landing page
kEvents.get('/commentWall/:eventId', async(req, res) => {
  try {
    const {eventId} = req.params;
    console.log(eventId);

    const comments = await EventComment.findAll({
      where: {
        eventId: eventId,
        type: 'text',
      },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    res.status(201).send(comments);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});



module.exports = kEvents;