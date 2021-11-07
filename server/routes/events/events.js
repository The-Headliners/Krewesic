const {Router} = require('express');
const events = Router();
require('dotenv').config();
const axios = require('axios');
const {v4} = require('uuid');
const {SGEvent, SGEventComment, User, Event} = require('../../../db/index.js');

const fs = require('fs');
const { dbSGEvent } = require('../../../db/models/SGEvent');
const { dbSGEventComment } = require('../../../db/models/SGEventComment');
const kEvents = require('./krewesicEvents.js');


const baseUri = 'https://api.seatgeek.com/2';

events.get('/bandSearch/:bandName', async (req, res) => {
  try {
    const {bandName} = req.params;
    const {data} = await axios.get(`${baseUri}/events?client_id=${process.env.SEATGEEK_CLIENT_ID}&client_secret=${process.env.SEATGEEK_SECRET}&performers.slug=${bandName}`);
    res.status(201).send(data);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.get('/citySearch/:city', async(req, res) => {
  try {
    const {data} = await axios.get(`${baseUri}/venues?client_id=${process.env.SEATGEEK_CLIENT_ID}&client_secret=${process.env.SEATGEEK_SECRET}&city=${city}`);
    res.status(200).send(data);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.get('/dateSearch/:date1/:date2/:city', async (req, res) => {
  try {
    const {date1, date2, city} = req.params;
    const {data} = await axios.get(`${baseUri}/events?client_id=${process.env.SEATGEEK_CLIENT_ID}&client_secret=${process.env.SEATGEEK_SECRET}&datetime_local.gte=${date1}&datetime_local.lte=${date2}&venue.city=${city}`);


    const releventInfo = data.events.map(event => {
      const {datetime_local, type, performers, venue, id} = event;
      const lat = venue.location.lat;
      const lng = venue.location.lon;
      const sgId = 'sg-' + id.toString();
      return {datetime_local, type, performers, id, sgId, venue, lat, lng};
    });
    res.status(201).send(releventInfo);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.post('/interestedInSG', async (req, res) => {

  try {
    //do a post
    const {eventId, when, performers, type, venue, city, lat, lng} = req.body;
    const {id} = req.user;


    const event = await SGEvent.findByPk(eventId);
    if (!event) { //if the event does not exist, create the event
      await SGEvent.create({
        id: eventId,
        type: type,
        performers: performers,
        venue: venue,
        city: city,
        lat: lat,
        lng: lng,
        when: when
      });
    }
    //create the interest comment
    const newInterest = await SGEventComment.create({
      type: 'interest',
      userId: id,
      SGEventId: eventId
    });


    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});



events.get('/interestedUsersSG/:sgId', async (req, res) => {
  try {
    const {sgId} = req.params;
    const interestedUsers = await SGEventComment.findAll({
      where: {
        SGEventId: sgId,
        type: 'interest'
      },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    res.status(201).send(interestedUsers);

    //get


  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.post('/SGcomment', async(req, res) => {
  try {
   
    const {comment, SGEventId} = req.body;
    const {id} = req.user;
    const event = await SGEvent.findByPk(SGEventId);
    if (!event) { //if the event does not exist, create the event
      await SGEvent.create({
        id: SGEventId,
        type: type,
        performers: performers,
        venue: venue,
        city: city,
        lat: lat,
        lng: lng,
        when: when,
        
      });
    }
    await SGEventComment.create({
      userId: id,
      text: comment,
      type: 'text',
      SGEventId

    });
    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.get('/SGcomments/:eventId', async (req, res) => {
  try {
    const {eventId} = req.params;
    //get the comments with that event id, include the user who commented
    const comments = await SGEventComment.findAll({
      where: {
        SGEventId: eventId,
        type: 'text'
      },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });
    res.status(201).send(comments);

  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.post('/createEvent', async(req, res) => {
  try {
    const uuid = v4();
    const {performers, when, type, medium, address, city, venue, state} = req.body;
    const {id} = req.user;
    const coordinates = {};
    if (medium === 'venue') {
      const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},
      +${city},+${state}&key=${process.env.GEOCODE_KEY}`);
      const {lat, lng} = data.results[0].geometry.location;
      coordinates.lat = lat,
      coordinates.lng = lng;
    }

    await Event.create({
      performers, when, type, medium, lat: coordinates.lat, lng: coordinates.lng, address, city, state, venue, artistId: id, code: uuid

    });

    res.sendStatus(200);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.get('/sampleLocalWeekend', async(req, res) => {
  try {
    const releventInfo = nolaweenSample.events.map(event => {
      const {datetime_local, type, performers, venue, id} = event;
      const sgId = 'sg-' + id.toString();
      const lat = venue.location.lat;
      const lng = venue.location.lon;
      return {datetime_local, type, performers, id, venue, lat, lng, sgId};
    });
    res.status(201).json(releventInfo);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

events.delete('/removeInterest/:eventId', async(req, res) => {
  try {
    const {id} = req.user;
    const {eventId} = req.params;
    await SGEventComment.destroy({
      where: {
        SGEventId: eventId,
        type: 'interest',
        userId: id
      }
    });
    res.sendStatus(203);

  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});


module.exports = events;
