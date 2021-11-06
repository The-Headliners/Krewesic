import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Search from './Search.jsx';
import Message from './Message.jsx';
import Conversation from './Conversation.jsx';
import ChatOnline from './Chat.jsx';
import Users from './Users.jsx';
import { async } from 'regenerator-runtime';
import GlobalContext from '../Contexts/GlobalContext.jsx';



//need the socket to connect to the server, which is the local host



//use socket.emit, to send event to server
//use socket.on, to take event from server



const DirectMessages = () => {
  //const socket = useRef();
  const {socket} = useContext(GlobalContext);
  const scrollRef = useRef();

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

  //hold all users online
  const [onlineUsers, setOnlineUsers] = useState([]);
  //hold the arrival message in the state
  const [arrivalMessage, setArrivalMessage] = useState(null);



  //take event from the socket server
  //checking to see who is on the server, who is online!
  useEffect(() => {
    //socket.current = io('ws://localhost:1337');
    socket.emit('addUser', currentUser.googleId);
    socket.on('getUsers', users => {
      //console.info('ONLINE USERS!!', users);
      axios.get('/userProf/allUsers')
        .then((results) => {
          const online = [];
          results.data.map(user => {
            users.map(onlineUser => {
              if (user.googleId === onlineUser.userId) {
                online.push(user);
                
              }

              // console.info('ONLINE USERS', online);
              setOnlineUsers(online);
            });
          });
        });
    });
  }, [currentUser]);


  //Get all conversations dealing with the user logged in
  // const getConversations = async () => {
  //   try {
  //     const conversations = await axios.get(`/chat/${currentUser.googleId}`);



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

        setConversations(conversations.data);
      } catch (err) {
        console.warn(err);
      }
    };
    getConversations();
  }, [currentUser.googleId]);


  //Event handler: whenever a user name is clicked, make the user and the current user logged in as a new conversation
  const createConversation = async (user) => {
    
    const users = {
      senderId: currentUser.googleId,
      receiverId: user.googleId
    };

    try {
      const conversation = await axios.post( '/chat/conversation', users);
      setConversations([...conversations, users]);
      //console.info('CONVERSATION!!:', conversation);
    } catch (err) {
      console.warn(err);
    }
  };


  //Doing another useEffect
  useEffect(() => {
    const getMessages = async () => {
      try {
        const messages = await axios.get(`/messages/allMessages/${currentChat?.id}`);
        setMessages(messages.data);

      } catch (err) {
        console.warn(err);
      }
    };

    getMessages();
  }, [currentChat]);

  //Handle submmit function to send a message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue('');
    const message = { sender: currentUser.googleId, text: value, conversationId: currentChat.id, name: currentUser.name};

    let receiver;
    currentChat.senderId === currentUser.googleId ? receiver = currentChat.receiverId : receiver = currentChat.senderId;
    
    //send message to the Socket server
    await socket.emit('sendMessage', {
      senderId: currentUser.googleId,
      receiverId: receiver,
      text: value,
      name: currentUser.name
    });

    setMessages(messages => [...messages, message]);




    try {
      const res = await axios.post(`/messages/sendMessage/${currentUser.id}`, message);
      

      //setMessages([...messages], res.data);
      //setValue('');
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);




  //***For incoming messages from another user, coming back from the Socket Server ***/
  socket.on('getMessage', ({senderId, text, name}) => {
   
    // let name;
    // senderId === currentUser.googleId ? name = currentUser.name : name;
    setMessages([...messages, {sender: senderId, text: text, name: name}]);
  });
 

  const messenger = {
    height: 'calc(100vh - 70px)',
    display: 'flex',
    backgroundColor: '#150050'
  };

  const chatMenu = {
    flex: '3.5',
    backgroundColor: 'black'
  };

  const chatBox = {
    flex: '5.5'
  };
  const chatOnline = {
    flex: '3'
  };
  const chatWrappers = {
    padding: '10px',
    height: '100%',
    backgroundColor: '#150050'
  };

  const chatBoxWrapper = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '10px',
    height: '100%',
    backgroundColor: '#150050'
  };
  const chatBoxBottom = {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };
  const chatMessageInput = {
    // width: '80%',
    // height: '90px',
    flex: '1',
    borderRadius: '30px',
    padding: '10px',
    border: 'none'
  };

  const chatSubmitButton = {
    width: '70px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#1877f2',
    color: 'white'
  };
  const chatBoxTop = {
    height: '100%',
    overflowY: 'scroll',
    paddingRight: '10px'
  };
  const noConversation = { 
    position: 'absolute',
    top: '10%',
    fontSize: '50px',
    color: 'rgb(224, 220, 220)',
    cursor: 'default',
  };
  return (
    <div className='messenger' style={messenger}>
      {/* <Users currentUser={currentUser}/> */}
      {/* <div className='search-feature'>
        <Search />
      </div> */}
      <div className='chatMenu' style={chatMenu}>
        <div className='chatMenuWrapper' style={chatWrappers}>
        Direct Message
          <Search createConversation={createConversation}/>
          {
            conversations.map(convo => (
              <div key={convo.id} onClick={() => setCurrentChat(convo)}>

                <Conversation conversation={convo} currentUser={currentUser}/>
              </div>
            ))
          }
        </div>
      </div>

      <div className='chatBox' style={chatBox}>
        <div className='chatBoxWrapper' style={chatBoxWrapper}>
          Inbox
          {
            currentChat ? (
              <>
                <div className="chatBoxTop" style={chatBoxTop}>
                  {messages.map(message => {
                    if (message.conversationId === currentChat.id) {

                      return (
                      
                        <div key={message.id}> 
                          <Message message={message} owner={message.sender === currentUser.googleId} currentUser={currentUser}/>
                        </div>
                      );
                    } else {
                      return (
                        <div> 
                          <Message message={message} owner={message.sender === currentUser.googleId} currentUser={currentUser}/>
                        </div>
                      );
                    }
                  })}
                </div>

                <div className='chatBoxBottom' style={chatBoxBottom}>
                  <input className='chatMessageInput' style={chatMessageInput} placeholder='write something...' value={value} onChange={(e) => setValue(e.target.value)}/>
                  <button className='chatSubmitButton' style={chatSubmitButton} onClick={handleSubmit}>Send</button>
                </div> </> ) : (<span className="noConversation" style={noConversation}> Add a User to start Direct Messaging.</span>

                
            )
          }
        </div>
      </div>
      <div className='chatOnline' style={chatOnline}>
        <div className='chatOnlineWrapper' style={chatWrappers}>
       Online <ChatOnline onlineUsers={onlineUsers}/>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;