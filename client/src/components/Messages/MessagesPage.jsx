import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import MessagesView from './MessagesView.jsx';
import Sidebar from './Sidebar.jsx';
import {Link} from 'react-router-dom';
import GlobalContext from '../Contexts/GlobalContext.jsx';
// import Button from '@material-ui/core/Button';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
//need the socket to connect to the server, which is the local host




const MessagesPage = () => {

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
    fontSize: '20px',
    color: 'rgb(224, 220, 220)',
    cursor: 'default',
  };
  const profileImg = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px'
  };

  const {socket, id, name} = useContext(GlobalContext);

  const scrollRef = useRef();
  //need to hold the value of the message in state
  const [currentMessage, setCurrentMessage] = useState('');

  // //for live chat practice, create a chat array in state to hold the chat messages
  const [chat, setChat] = useState([]);


  //get the current user's name, hold the user in the state
  const [user, setUser] = useState(null);

  const [users, setUsers] = useState([]);


  //the other user.  
  const [otherUser, setOtherUser] = useState({});
  const [otherUserId, setOtherUserId] = useState(0);

  const otherUserRef = useRef();

  const postMessage = async() => {
  
    axios.post('/messages/postMessage', {message: currentMessage, sender: id, receiver: otherUserId});
  };


  const sendMessage = (event) => {
    event.preventDefault();
    //value from state is the message we want to bring back to the socket server
    //the name will be the current user logged in
    postMessage();
    //add the message to chat via setChat
    setChat(list => [...list, {message: currentMessage, name: otherUser.name, pic: otherUser.pic, sender: id, receiver: otherUserId}]);
    socket.emit('privateMessage', { name: user.name, message: currentMessage, receiver: otherUserId, sender: id});
    setCurrentMessage('');


  };



  //to be attatched as a click event for the users in the side bar.  takees in the other users Id.  this will reset the chat array to have the messages between current user and the other user. 
  const changeMessageView = async(otherUserId) => {
    try {
      setOtherUserId(otherUserId);
      const oUser = await axios.get(`/userProf/user/${otherUserId}`);
      setOtherUser(oUser.data);
      otherUserRef.current = oUser.data;
      const {data} = await axios.get(`/messages/getMessages/${otherUserId}`);
     
      setChat(data);
    } catch (err) {
      console.warn('err', err);
    }
  };



  const handleChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const refresh = () => {

    socket.emit('usingMessagingFeature', { 
      userId: id
    });
  };


  useEffect(() => {
   
    axios.get('/userProf/allUsers')
      .then(({data}) => {
        // console.info('ALL USERS', data);
        setUsers(data);
      });

    socket.emit('usingMessagingFeature', { 
      userId: id
    });

    socket.on('receivedPrivateMessage', (res) => {

      if (res.sender === otherUserRef.current.id) {
        setChat(list => [...list, {message: res.message, sender: res.sender, receiver: res.receiver}]);
      }
    });
    // socket.on('disconnect', (r) => console.log('disconnect'))
    // socket.on('reconnect', () => {
    //      console.log('reconnect')
    //      socket.emit('usingMessagingFeature', {userId: id})
    //  })
        
    //see below comment
 

  }, []);

  //a use effect for [socket] to refire the emit? so will fire if socekt changes and is reconnected?  
  //useref in app.jsx might also be good- maybe can return to just getting socket ids from logged in users

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  
  useEffect(() => {
    axios.get('/auth/cookie')
      .then(({data}) => {
        // console.info(data);
        setUser(data[0]);
      });
  }, []);

  if (user) {
    return (
      <div className='messenger' style={messenger}>
        <div className='chatMenu' style={chatMenu}>
          <div className='chatMenuWrapper' style={chatWrappers}>
            <h1 style={{color: '#c3c2c5'}}><img className='user-image' style={profileImg} src={user.pic}/>{user.name}</h1>
            <Link to='/communityChat'>Community Chat </Link>
            <Button>Refresh</Button>
          </div>
        </div>

        <div className='chatBox' style={chatBox}>
          <div className='chatBoxWrapper' style={chatBoxWrapper}>
          Live Chat with {otherUser.name}
            <div className="chatBoxTop" style={chatBoxTop}>
              {
                chat.length === 0 ? (
                 
                  <span className="noMessage" style={noConversation}> Start Chatting Live...</span>
                  
                )
                  :

                  chat.map((message, i) => {
              
                    return (
                      <div key={i}>
                        <MessagesView message={message} senderName={message.sender === id ? name : otherUser.name} self={message.sender === id} user={user}/>
                      </div>
                    );
                  
                  })
              
              }
            </div>
      
       
            {otherUserId === 0 ? <div>select a user</div> : (
              <div className='chatBoxBottom' style={chatBoxBottom}>
                <input className="message-input" style={chatMessageInput} placeholder="Send a message..." value={currentMessage} onChange={handleChange} />

                <Button className="message-button" variant="contained" style={chatSubmitButton} onClick={ (event) => sendMessage(event)}> send </Button>
        
              </div>
            )}
          
          </div>
        </div>
        <div className='chatOnline' style={chatOnline}> 
          <div className='chatOnlineWrapper' style={chatWrappers}> 
           Other Users  <Sidebar changeMessageView={changeMessageView} users={users}/>
          </div>
        </div>
      </div>
    ); 
  } else {
    return (
      <div
        align='center' style={{height: '100vh', backgroundColor: '#150050', display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}
      ><a href='/auth/google'><Button
          startIcon={ <LoginIcon />}
          style={{ backgroundColor: '#610094', marginBottom: '10px'}}
          variant='contained'
        >Log In</Button></a></div>
    );
  }
  
};

export default MessagesPage;