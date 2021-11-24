import React, {useState, useEffect, useContext} from 'react';

const ChatOnline = ({users, createConversation}) => {

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
        users.map( user => (
          <div className='chatOnlineUser' key={user.id} style={chatOnlineUser}>
        
            <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
              <img className="chatOnlineImg" src={user.pic} style={chatOnlineImg} alt=""/>
              <div className='chatOnlineBadge' style={chatOnlineBadge}></div>
            </div>
      
            <div className='chatOnlineName' onClick={() => createConversation(user)}>
              {user.name}
            </div>

          </div>
        )
        )
      }
    </div>
  );
};

export default ChatOnline;
