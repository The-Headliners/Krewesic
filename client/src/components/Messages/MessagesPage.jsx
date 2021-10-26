import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import MessagesView from './MessagesView.jsx';
import Sidebar from './SidebarChat.jsx';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';

//need the socket to connect to the server, which is the local host
const socket = io.connect('http://localhost:1337');

const MessagesPage = () => {
  //need to hold the value of the message in state
  const [value, setValue] = useState('');

  // //for live chat practice, create a chat array in state to hold the chat messages
  const [chat, setChat] = useState([]);


  //get the current user's name, hold the user in the state
  const [user, setUser] = useState('');




  const sendMessage = (event) => {
    event.preventDefault();
    //value from state is the message we want to bring back to the socket server
    //the name will be the current user logged in
    socket.emit('message', { name: user, message: value});
    setValue('');

    //where we need to send an axios post to create the message in the Messages db
    // axios.post('/messages/sendMessage', { text: value })
    //   .then((results) => {
    //     console.log('messageCreated:', results);
    //   })
    //   .catch(err => {
    //     console.log('ERROR:', err);
    //   });
  };



  const handleChange = (event) => {
    setValue(event.target.value);
  };


  //**Get all messages from current User*/
  const getMessages = () => {
    axios.get('/messages/sendMessage')
      .then( (results) => {
        // setMessages(results.data);
      })
      .catch( err => {
        console.warn('ERROR!:', err);
      });
  };

  socket.on('message', ({name, message}) => {

    setChat([...chat, {name, message: message}]);
  });

  useEffect(() => {
    //getMessages();
    // socket.on('message', ({name, message}) => {
    //   setChat([...chat, {name, message: message}]);
    // });

    axios.get('/auth/cookie')
      .then(({data}) => {
        setUser(data[0].name);
      });
  }, []);




  const page = {
    backgroundColor: 'yellow',
    height: '100vh'
  };

  const body = {
    display: 'flex',
    backgroundColor: '#ededed',
    height: '90vh',
    width: '90vw',
  };

  return (
    <div className='message-page' style={page}>
      <Link to='/DirectMessage'>Direct Messaging </Link>
      <h1 style={{color: 'black'}}>{user}</h1>
      <div className='message-body' style={body}>
        <Sidebar />
        <MessagesView chat={chat} handleChange={handleChange} sendMessage={sendMessage} value={value}/>
      </div>
    </div>
  );
};

export default MessagesPage;