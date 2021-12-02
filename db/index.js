const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./db.config.js');
const pg = require('pg');
const {dbUser} = require('./models/users.js');
const { dbMessages } = require('./models/messages.js');
const { dbRooms} = require('./models/chatRooms.js');
const { dbmusicUpload} = require('./models/uploadMusic.js');
const { dbProfilePosts } = require('./models/ProfilePost');
//const {dbConversation} = require('./models/conversation.js');
const {dbEventComment} = require('./models/eventComment.js');
const { dbFollow } = require('./models/Follow.js');
const {dbSGEvent} = require('./models/SGEvent.js');
const { dbSGEventComment} = require('./models/SGEventComment.js');
const dbEvent = require('./models/events.js');
const {dbVideoChat} = require('./models/videoChat');
const {dbSocket} = require('./models/usersSocket.js');

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});




const User = dbUser(db);
const Messages = dbMessages(db);
const Rooms = dbRooms(db);
//const Conversations = dbConversation(db);
const MusicUpload = dbmusicUpload(db);
const VideoChat = dbVideoChat(db);
const UsersSocket = dbSocket(db);





const Event = dbEvent(db);
const EventComment = dbEventComment(db);


const SGEvent = dbSGEvent(db);
const SGEventComment = dbSGEventComment(db);


Event.belongsTo(User, {foreignKey: 'artistId'});

EventComment.belongsTo(User, {foreignKey: 'userId'});
EventComment.belongsTo(Event, {foreignKey: 'eventId'});


//User.hasMany(Messages);
Messages.belongsTo(User, {foreignKey: 'sender', as: 'senderId'});
Messages.belongsTo(User, {foreignKey: 'receiver', as: 'receiverId'});


User.hasMany(MusicUpload);
MusicUpload.belongsTo(User);
SGEventComment.belongsTo(SGEvent, {foreignKey: 'SGEventId'});
SGEventComment.belongsTo(User, {foreignKey: 'userId'});

/* eslint-disable */
const Posts = dbProfilePosts(db);
//senderId foreignKey cause we want both types of users to be able to post
User.hasMany(Posts);
Posts.belongsTo(User, {foreignKey: 'senderId'});
Posts.belongsTo(User, {foreignKey: 'profileId'});

const Follows = dbFollow(db);
User.hasMany(Follows);
Follows.belongsTo(User, {foreignKey: 'followId'});
Follows.belongsTo(User, {foreignKey: 'followedId'});

VideoChat.belongsTo(User, {foreignKey: 'creatorId'})


//sync the db
db.sync()
  .then(() => {
    console.log('db synced');
  })
  .catch((err) => console.warn(err));

module.exports = {
  db,
  User,
  Messages,
  Rooms,
  //Conversations,
  MusicUpload,
  UsersSocket,
  SGEvent,
  SGEventComment,
  Event,
  EventComment,
  Posts,
  Follows,
  VideoChat
};
