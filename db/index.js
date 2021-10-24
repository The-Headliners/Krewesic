const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./db.config.js');
const pg = require('pg');
const {dbUser} = require('./models/users.js');
const { dbMessages } = require('./models/messages.js');
const { dbRooms} = require('./models/chatRooms.js');
const { dbProfilePosts } = require('./models/ProfilePost');
const {dbEventComment} = require('./models/eventComment.js');
const {dbSGEvent} = require('./models/SGEvent.js');
const { dbSGEventComment} = require('./models/SGEventComment.js');
const dbEvent = require('./models/events.js');
const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});




const User = dbUser(db);
const Messages = dbMessages(db);
const Rooms = dbRooms(db);

const Event = dbEvent(db);
const EventComment = dbEventComment(db);


const SGEvent = dbSGEvent(db);
const SGEventComment = dbSGEventComment(db);


Event.belongsTo(User, {foreignKey: 'artistId'});

EventComment.belongsTo(User, {foreignKey: 'userId'});
EventComment.belongsTo(Event, {foreignKey: 'eventId'});


User.hasMany(Messages);
Messages.belongsTo(User);
SGEventComment.belongsTo(SGEvent, {foreignKey: 'SGEventId'});
SGEventComment.belongsTo(User, {foreignKey: 'userId'});


const Posts = dbProfilePosts(db);
//userId foreignKey cause we want both types of users to be able to post
User.hasMany(Posts);
Posts.belongsTo(User, {foreignKey: 'userId'});


//sync the db
db.sync()
  .then(() => {
    console.log('db synced');
  })
  .catch((err) => console.error('err', err));

module.exports = {
  db,
  User,
  Messages,
  Rooms,
  SGEvent,
  SGEventComment,
  Event,
  Posts
};
