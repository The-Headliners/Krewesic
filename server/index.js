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
const mailingList = require('./routes/mailingList.js');
const kEvents = require('./routes/events/krewesicEvents.js');
const cookieParser = require('cookie-parser');




//create the server
const server = http.createServer(app);

app.use(express.static(frontEnd));
app.use(express.json());
//use cookie parser
app.use(cookieParser());

//Socket io  getting started//
const io = require('socket.io')(server);

//Socket server
//holds alll users that are online
let users = [];

//function to add user to the array
const addUser = (userId, socketId) => {
  //check inside users array, if the same user is already inside users
  //do not add user
  !users.some(user => user.userId === userId) && users.push({ userId, socketId});
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};
io.on('connection', socket => {
  //when connect

  //***FOR LIVE CHAT FOR ALL USERS*** when a message is sent
  socket.on('message', ({ name, message}) => {
    io.emit('message', {name, message});
  });

  //if you want to send one client
  //use: io.to(socketID).emit

  //after every connection, take userId and socketId from user
  //take from the client socket
  socket.on('addUser', userId => {
    addUser(userId, socket.id);

    io.emit('getUsers', users);
  });

  //***PRIVATE MESSAGE****send and get a message
  //socket.on, take from the client
  socket.on('sendMessage', ({senderId, receiverId, text, name}) => {
    //find specific user to send message
    const user = getUser(receiverId);

    //send data back to certain user send to client
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
      name
    });
  });

  //When disconnect
  socket.on('disconnect', () => {
    //if there are any disconnections
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
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
app.use('/mailingList', mailingList);
app.use('/krewesicevents', kEvents);
app.use('/userProf', userRouter);
app.use('/follow', follow);
app.use('/post', post);



app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontEnd, 'index.html'));

});
/* eslint-disable */
server.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
});
