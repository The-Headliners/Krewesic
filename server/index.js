const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const {PORT} = process.env;
const http = require('http');
const frontEnd = path.resolve(__dirname, '..', 'client', 'dist');
const session = require('express-session');
const passport = require('passport');

const passportSetup = require('../config/passport-setup');
const userRouter = require('./routes/userRouter.js');
const {Message} = require('./routes/message/messages.js');
const {Room} = require('./routes/message/rooms.js');
const {Users} = require('./routes/message/directMessage.js');
const {Conversation} = require('./routes/message/converations.js');
const {Upload} = require('./routes/MusicUpload/musicUpload.js');
const {db} = require('../db');
const auth = require('./routes/authenticate');
const {form} = require('./routes/form.js');
const post = require('./routes/Posts/ProfilePosts');
const follow = require('./routes/Follow/Follows');
const events = require('./routes/events/events.js');
const artist = require('./routes/artist.js');
const kEvents = require('./routes/events/krewesicEvents.js');
const cookieParser = require('cookie-parser');
const {UsersSocket} = require('../db/index.js');

//for video streaming
const virtualEvent = require('./routes/virtualEvent.js');
const {PeerServer} = require('peer');
const _ = require('underscore');



//create the server
const server = http.createServer(app);

const peerServer = PeerServer({
  port: 3002,
  path: '/',
  proxied: true,
  debug: true
});





app.use(express.static(frontEnd));
app.use(express.json());
//use cookie parser
app.use(cookieParser());

//Socket io  getting started//
const io = require('socket.io')(server, {'pingTimeout': 180000, 'pingInterval': 25000});

//Socket server
//holds alll users that are online
const users = [];

const loggedInUsers = {}; //to keep track of logged in users.  will be in key:value pairs of userId: socketId

const liveStreamUsers = {}; //this gonna hold the rooms and their arrays {roomId: [user1, user2...]}
const removeLiveStreamUser = (socketId, showId) => {
  for (show in liveStreamUsers) {
    liveStreamUsers[show] = liveStreamUsers[show].filter(user => user.socketId !== socketId); 
  }
 
};

const messageFeatureUsers = {}; //keep track of user id and their corresponding socket ids as k/v pairs as a user goes to the messags component

//function to add user to the array
const addUser = (userId, socketId) => {
  //check inside users array, if the same user is already inside users
  //do not add user

  const newSocket = UsersSocket.create({
    id: userId, socketId: socketId
  });
  return newSocket;
  // console.info('ADDED TO THE SOCKET', newSocket);

  // !users.some(user => user.userId === userId) && users.push({ userId, socketId});
};

const removeUser = async (socketId) => {

  try {
    const userSocket = await UsersSocket.destroy({
      where: { socketId: socketId}
    });
      
    // console.info('FOUND USER SOCKET', userSocket[0].dataValues.socketId);
    res.status(201);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
  // users = users.filter(user => user.socketId !== socketId);
};

//const getUser = (userId) => {
app.get('/userSocket/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const userSocket = await UsersSocket.findAll({
      where: { id: id}
    });
      
    console.info('FOUND USER SOCKET', userSocket[0].dataValues.socketId);
    res.status(201).send(userSocket);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});

// return userSocket;
// console.info('FOUND USER', userSocket);
//return users.find((user) => user.userId === userId);
// };
io.on('connection', socket => {
  //when connect
  console.info(`user ${socket.id} is connected`);
  console.info(socket.handshake.query);

  //***FOR LIVE CHAT FOR ALL USERS*** when a message is sent */
  socket.on('message', ({ name, message, pic}) => {
    io.emit('message', {name, message, pic});
  });

  //if you want to send one client
  //use: io.to(socketID).emit

  //after every connection, take userId and socketId from user
  //take from the client socket
  socket.on('addUser', userId => {
    const users = addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //***PRIVATE MESSAGE****send and get a message */
  //socket.on, take from the client
  socket.on('sendMessage', ({senderId, receiverId, text, name, User, socketId}) => {
    //find specific user to send message
    //const user = getUser(receiverId);
    //send data back to certain user send to client
   
    
    // console.info('TO USER', socketId);
    // console.info('MESSAGE', text, 'NAME:', name, 'User:', User);
    io.to(receiverId).emit('getMessage', {
      senderId,
      text,
      name,
      User
    }); 
  });

  /**for when a user logs in */
  socket.on('loggedIn', async (data) => {
    const id = data;
    loggedInUsers[id] = socket.id;
  });

  //for DMs

  socket.on('usingMessagingFeature', (res) => {

    messageFeatureUsers[res.userId] = socket.id;


  } );
  socket.on('privateMessage', (data) => {
    const otherSocketId = loggedInUsers[data.receiver];
    //const otherSocketId = messageFeatureUsers[data.receiver];
    
    if (otherSocketId) {
      socket.to(otherSocketId).emit('receivedPrivateMessage', data);
    }

  });

  //****for streaming features */

  socket.on('notify', (data) => {
    const {id, notification} = data;
    const sockId = loggedInUsers[id];
    io.to(sockId).emit('notified', data);
  });
  socket.on('joinShow', ({showId, userId, name}) => {
    console.info('join show event, showId then userId', showId, userId);
    const idObj = {socketId: socket.id, peerId: userId};
    if (liveStreamUsers[showId]) {
      liveStreamUsers[showId].push(idObj);
    } else {
      liveStreamUsers[showId] = [idObj];
    }
    socket.join(showId);
    socket.to(showId).emit('user-connected', {name: name, latestUser: userId, allUsers: liveStreamUsers[showId]}); 
  });


  socket.on('peerconnected', (data) => {
    console.info('on peer connected', data);
    const {showId, userId, name} = data;
    const idObj = {socketId: socket.id, peerId: userId};
    if (showId && userId) {
      if (liveStreamUsers[showId] === undefined) {
        liveStreamUsers[showId] = idObj;
      } else if (liveStreamUsers[showId] && !liveStreamUsers[showId].map(obj => obj.peerId).includes(userId)) {
        liveStreamUsers[showId].push(idObj);
      }
      socket.to(showId).emit('anotherPeerHere', {name: name, latestUser: userId, allUsers: liveStreamUsers[showId]}); /**changed this restructure the data on the front end!!!! */

    }
   
  });

  socket.on('liveStreamMessage', (messageObj) => {
    const {showId, message} = messageObj;
    socket.to(showId).emit('receiveLiveStreamMessage', messageObj );
  });


  //When disconnect
  socket.on('disconnect', (reason) => {
    
    //if there are any disconnections
    console.info('disconnected user', socket.id, 'reason', reason);
    removeUser(socket.id);
    removeLiveStreamUser(socket.id); //this needs to account for peerId not socketId because the users are via peerId
    // io.emit('getUsers', users);
  }); 
});
 
app.get('/virtualEventUsers/:showId', async (req, res) => {
  try {
    const {showId} = req.params;
    res.status(201).send(liveStreamUsers[showId]);
  } catch (err) {
    console.warn(err);
    res.sendStatus(500);
  }
});



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/form', form);
app.use('/messages', Message);
app.use('/roomChat', Room);
app.use('/directMessage', Users);
app.use('/chat', Conversation);
app.use('/upload', Upload);
app.use('/events', events);
app.use('/artist', artist);
app.use('/krewesicevents', kEvents);
app.use('/userProf', userRouter);
app.use('/follow', follow);
app.use('/virtualEvent', virtualEvent);

app.use('/post', post);



app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontEnd, 'index.html'));

});
/* eslint-disable */
server.listen(PORT, ()=> {
  //console.log(`listening on port ${PORT}`);
});
