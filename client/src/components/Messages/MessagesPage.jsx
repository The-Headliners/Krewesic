import React, {useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import MessagesView from './MessagesView.jsx';
import Sidebar from './SidebarChat.jsx';
import MessageForm from './MessageForm.jsx'; 
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import Button from '@material-ui/core/Button';
//need the socket to connect to the server, which is the local host




const MessagesPage = () => {
  const {socket} = useContext(GlobalContext);

  const scrollRef = useRef();
  //need to hold the value of the message in state
  const [value, setValue] = useState('');

  // //for live chat practice, create a chat array in state to hold the chat messages
  const [chat, setChat] = useState([]);


  //get the current user's name, hold the user in the state
  const [user, setUser] = useState('');

  const [users, setUsers] = useState([]);


  const sendMessage = (event) => {
    event.preventDefault();
    //value from state is the message we want to bring back to the socket server
    //the name will be the current user logged in
    socket.emit('message', { name: user.name, message: value, pic: user.pic});
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

  socket.on('message', ({name, message, pic}) => {

    setChat([...chat, {name, message: message, pic: pic}]);
  });

  useEffect(() => {
    axios.get('/auth/cookie')
      .then(({data}) => {
        // console.info(data);
        setUser(data[0]);
      });
  }, []);

  useEffect(() => {
   
    axios.get('/userProf/allUsers')
      .then(({data}) => {
        // console.info('ALL USERS', data);
        setUsers(data);
      });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  
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
  const profileImg = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px'
  };

  return (
    <div className='messenger' style={messenger}>
      <div className='chatMenu' style={chatMenu}>
        <div className='chatMenuWrapper' style={chatWrappers}>
          <h1 style={{color: '#c3c2c5'}}><img className='user-image' style={profileImg} src={user.pic}/>{user.name}</h1>
          <Link to='/DirectMessage'>Direct Messaging </Link>
        </div>
      </div>

      <div className='chatBox' style={chatBox}>
        <div className='chatBoxWrapper' style={chatBoxWrapper}>
          Live Chat
          <div className="chatBoxTop" style={chatBoxTop}>
            {
              chat.length === 0 ? (
                 
                <span className="noMessage" style={noConversation}> Start Live Chatting...</span>
                  
              )
                :

                chat.map((message, i) => {
  
                  return (
                    <div key={i}>
                      <MessagesView message={message} user={user}/>
                    </div>
                  );
                  
                })
              
            }
          </div>
          {/* <MessagesView chat={chat} handleChange={handleChange} sendMessage={sendMessage} value={value} user={user}/> */}
       

          <div className='chatBoxBottom' style={chatBoxBottom}>
            <input className="message-input" style={chatMessageInput} placeholder="Send a message..." value={value} onChange={handleChange} />

            <Button className="message-button" variant="contained" style={chatSubmitButton} onClick={ (event) => sendMessage(event)}> send </Button>
            {/* <MessageForm handleChange={handleChange} sendMessage={sendMessage} value={value} chatMessageInput={chatMessageInput} chatSubmitButton={chatSubmitButton}/> */}
          </div>
        </div>
      </div>
      <div className='chatOnline' style={chatOnline}> 
        <div className='chatOnlineWrapper' style={chatWrappers}> 
           Online  <Sidebar users={users}/>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;