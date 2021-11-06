import React, {useState, useEffect} from 'react';
import {Avatar} from '@material-ui/core';
//goes towards the chat footer
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MicIcon from '@material-ui/icons/Mic'; 

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
    <div className='message' style={message.name === user ? ownMessage : Message}>
      <div className="messageTop" >
        <img className='messageImg' style={messageImg} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbCHBytowb0SiotsKsEzRFiJ37uH8GqkA-A&usqp=CAU" alt=""/>

        {message.name}
        <p className="messageText" style={message.name === user ? ownMessageText : messageText}>{message.message}</p>
        <div className='messageBottom' style={messageBottom}> 1 hour ago</div>
      </div>

      {/* <div className="chat-body">
        {
          chat.map(message => {
            return (
              <div key={message.id}>
                <h2 key={message.id} style={ message.name === user ? {position: 'relative', marginLeft: 'auto', width: 'fit-content', color: '#c3c2c5'} : {position: 'relative', width: 'fit-content', color: '#c3c2c5'}}>{message.name}</h2>
                <p key={message.id} className="chat-message" style={message.name === user ? chatMessageSender : chatMessageRecipient}>
                  {message.message}

                  <span key={message.id} className="chat-timeStamp" style={timeStamp}> 3:52pm</span>
                </p>
              </div>
            );
          })
        }
      </div> */}

      {/* <div className="chat-footer" style={chatFooter}>
        <AddAPhotoIcon style={photoIcon}/>
        <MessageForm handleChange={handleChange} sendMessage={sendMessage} value={value}/>
        <MicIcon /> 
      </div> */}
    </div>
  );
};

export default MessagesView;