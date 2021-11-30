import React, {useState, useEffect} from 'react';

//goes towards the chat footer


const MessagesView = ({message, user}) => {

  //Style for MessagesView//
  const Message = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px'
  };

  const messageImg = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px'
  };

  const messageText = {
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: '#1877f2',
    color: 'white',
    maxWidth: '300px',
  };

  const messageBottom = {
    fontSize: '12px',
    marginTop: '10px'
  };

  const ownMessage = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    alignItems: 'flex-end'
  };

  const ownMessageText = {
    padding: '10px',
    borderRadius: '20px',
    backgroundColor: 'rgb(245, 241, 241)',
    color: 'black',
    maxWidth: '300px',
  };
  return (
    <div className='message' key={message.id} style={message.name === user.name ? ownMessage : Message}>
      <div className="messageTop" >
        <img className='messageImg' style={messageImg} src={message.pic} alt=""/>

        {message.name}
        <p className="messageText" style={message.name === user.name ? ownMessageText : messageText}>{message.message}</p>
        <div className='messageBottom' style={messageBottom}> 1 hour ago</div>
      </div>
    </div>
  );
};

export default MessagesView;