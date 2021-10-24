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

const {Message} = require('./routes/message/messages.js');
const {Room} = require('./routes/message/rooms.js');
const {Users} = require('./routes/message/directMessage.js');
const {Conversation} = require('./routes/message/converations.js');
const {db} = require('../db');
const auth = require('./routes/authenticate');
const {form} = require('./routes/form.js');
const events = require('./routes/events.js');
const cookieParser = require('cookie-parser');
//const graphql = require('graphql');
//const { graphqlHTTP } = require('express-graphql');



//create the server
const server = http.createServer(app);

app.use(express.static(frontEnd));
app.use(express.json());
//use cookie parser
app.use(cookieParser());

//Socket io  getting started//
const io = require('socket.io')(server);

//Socket server
//update this array
let users = [];
console.log(users);
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
  // let user;
  return users.find((user) => user.userId === userId);
  // users.forEach(u => {
  //   console.log('check for users', u);
  //   // if (u.userId === userId) {
  //   //   user = u;
  //   // }
  //   // return user;
  // });
};
io.on('connection', socket => {
  //console.log('Is this what we want?', getUser('116854415860903718619'));

  //when connect

  //***FOR LIVE CHAT FOR ALL USERS*** when a message is sent
  socket.on('message', ({ name, message}) => {
    io.emit('message', {name, message});
  });

  //if you want to send one client
  //use: io.to(socketID).emit
  // io.to().emit('welcome', 'hello this is socket server!');
  
  //after every connection, take userId and socketId from user
  //take from the client socket
  socket.on('addUser', userId => {
    addUser(userId, socket.id);

    io.emit('getUsers', users);
  });

  //***PRIVATE MESSAGE****send and get a message
  //socket.on, take from the client
  socket.on('sendMessage', ({senderId, receiverId, text}) => {
    //find specific user to send message
    const user = getUser(receiverId + '');
    console.log('NEW USER', user);
    //send data back to certain user send to client
    io.to(user.socketId).emit('getMessage', {
      senderId, 
      text
    });
  });  

  //When disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected');
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
app.use('/events', events);




app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontEnd, 'index.html'));

});

server.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
});
