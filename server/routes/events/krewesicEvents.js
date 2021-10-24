const {Router} = require('express');
const kEvents = Router();
const {Event, User} = require('../../../db');
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
    console.log('event eventid', eventId);
    const event = await Event.findOne({where: {id: eventId}, include: [{model: User}]});
    res.status(201).send(event);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = kEvents;