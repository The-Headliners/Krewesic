import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';

const ChatOnline = ({onlineUsers}) => {

  const chatOnlineUser = {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '10px'
  };

  const chatOnlineImg = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid white'
  };

  const chatOnlineImgContainer = {
    position: 'relative',
    marginRight: '10px'
  };

  const chatOnlineBadge = { 
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'limegreen',
    position: 'absolute',
    top: '2px',
    right: '2px'
  };
  //to render the conversations
  return (
    <div className='chatOnline'>
      {
        onlineUsers.map( user => {
          return (
            <div className='chatOnlineUser' key={user.id} style={chatOnlineUser}>
        
              <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
                <img className="chatOnlineImg" style={chatOnlineImg} src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt=""/>
                <div className='chatOnlineBadge' style={chatOnlineBadge}></div>
              </div>
      
              <div className='chatOnlineName'>
                {user.name} 
              </div>

            </div>
          );
        })
      }
    </div>
  );
};

export default ChatOnline;
