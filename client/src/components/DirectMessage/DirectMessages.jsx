import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Search from './Search.jsx';
import Message from './Message.jsx';
import Conversation from './Conversation.jsx';
import { async } from 'regenerator-runtime';

//need the socket to connect to the server, which is the local host
// const socket = io('ws://localhost:1337');
//use socket.emit, to send event to server
//use socket.on, to take event from server



const DirectMessages = () => {
  const socket = useRef();

  //get the current user's name, hold the user in the state
  const [currentUser, setUser] = useState('');
  //hold conversations in state
  const [conversations, setConversations] = useState([]);
  // hold current chat in state
  const [currentChat, setCurrentChat] = useState(null);
  //hold all message in state
  const [messages, setMessages] = useState([]);
  //hold new message in state
  const [value, setValue] = useState('');

  //hold the arrival message in the state
  const [arrivalMessage, setArrivalMessage] = useState(null); 

  // console.log('SOCKET ID??', socket);

  //take event from the socket server
  //checking to see who is on the server, who is online!
  useEffect(() => {
    socket.current = io('ws://localhost:1337');
    socket.current.emit('addUser', currentUser.googleId);
    socket.current.on('getUsers', users => {
      console.log('Socket Users:!!', users);
    });
  }, [currentUser]);




  //Get all conversations dealing with the user logged in
  // const getConversations = async () => {
  //   try {
  //     const conversations = await axios.get(`/chat/${currentUser.googleId}`);
  //     console.log('CONVOS:', conversations);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  
 
  //Get the logged in user here!
  useEffect(() => {
    // getMessages();

    //get user logged in
    axios.get('/auth/cookie')
      .then(({data}) => {
        setUser(data[0]);
      });

    const getConversations = async () => {
      try {
        const conversations = await axios.get(`/chat/${currentUser.googleId}`);
        //console.log('CONVOS:', conversations);
        setConversations(conversations.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [currentUser.googleId]);

  // console.log(currentUser);
  //console.log('current chat!!:', currentChat);
  
  //Doing another useEffect
  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await axios.get(`/messages/allMessages/${currentChat?.id}`);
        //console.log('Messages from convo', messages);
        setMessages(messages.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //Handle submmit function to send a message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = { sender: currentUser.googleId, text: value, conversationId: currentChat.id};

    let receiver;
    currentChat.senderId === currentUser.googleId ? receiver = currentChat.receiverId : receiver = currentChat.senderId;
    console.log('CHECK WHO IS RECEIVER', receiver);
    //send message to the Socket server
    socket.current.emit('sendMessage', {
      senderId: currentUser.googleId,
      receiverId: receiver,
      text: value
    });

    try {
      const res = await axios.post('/messages/sendMessage', message);
      // console.log('MESSAGES', res);
      setMessages([...messages], res.data);
      setValue('');
    } catch (err) {
      console.log(err);
    }
  };

  //get message from socket server
  useEffect(() => {
    socket.current.on('getMessage', data => {
      console.log('Message back from socket?', data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      });
    });
  }, []);

  console.log('the upcoming', arrivalMessage);
  //***Go back to this if you run into trouble
  useEffect(() => {
    arrivalMessage && (currentChat?.senderId || currentChat?.receiverId) === arrivalMessage.sender && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  return (
    <div className='directPage'>
      <div className='search-feature'>
        <Search />
      </div>
      <div className='chatOnline'>
        <div className='chatWrapper'>
          {
            conversations.map(convo => (
              <div onClick={() => setCurrentChat(convo)}>

                <Conversation conversation={convo} currentUser={currentUser}/>
              </div>
            ))
          }
        </div>
      </div>
      
      <div className='chatBox'>
        <div className='chatBoxCover'>
          {
            currentChat ? (
              <>
                {messages.map(message => (

                  <Message message={message} owner={message.sender === currentUser.googleId}/>
                ))}
        

                <div className='writeMessage'> 
                  <textarea className='messageInput' placeholder='write something...' value={value} onChange={(e) => setValue(e.target.value)}> </textarea>
                  <button className='sendMessageButton' onClick={handleSubmit}>Send</button>
                </div> </> ) : (<span className="noConversation"> Open a Conversation to start a Chat.</span>

            )}
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;