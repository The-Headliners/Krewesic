import React, {useState, useEffect} from 'react';
import {Avatar} from '@material-ui/core';
import MessageForm from './MessageForm.jsx'; //goes towards the chat footer
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MicIcon from '@material-ui/icons/Mic'; 

const MessagesView = ({chat, handleChange, sendMessage, value}) => {


  //Style for MessagesView//
  const boxStyle = {
    flex: '0.65',
    backgroundColor: 'lightgray',
  };
  const chatHeader = {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid lightgray'
  };
  const chatMessageSender = {
    position: 'relative',
    fontSize: '16px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: 'fit-content',
    marginBottom: '30px',
    marginLeft: 'auto',
    color: 'black'
  };
  // const chatMessageRecipient = {
  //   position: 'relative',
  //   fontSize: '16px',
  //   padding: '10px',
  //   backgroundColor: 'white',
  //   borderRadius: '10px',
  //   width: 'fit-content',
  // }
  const timeStamp = {
    marginLeft: '10px',
    fontSize: 'xx-small'
  };

  const chatFooter = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: '100px',
    height: '62px',
    borderTop: '1px solid lightgray'
  };

  const photoIcon = {
    padding: '10px',
  // color: 'grey'
  };

  return (
    <div className='chat' style={boxStyle}>
      <div className="chat-header" style={chatHeader}>
        <Avatar src='https://www.uidownload.com/files/790/68/996/free-set-of-material-design-avatars.png'/>

        <div className="chat-header-info" style={{color: 'black'}}>
          <h3>Krewesic Chat Room</h3>
          <p>Chat along...</p>
        </div>
      </div>

      <div className="chat-body">
        {
          chat.map(message => {
            return (
              <div>
                <h2 style={{position: 'relative', marginLeft: 'auto', width: 'fit-content', color: 'black'}}>{message.name}</h2>
                <p className="chat-message" style={chatMessageSender}>
                  {message.message}

                  <span className="chat-timeStamp" style={timeStamp}> 3:52pm</span>
                </p>
              </div>
            );
          })
        }
      </div>

      <div className="chat-footer" style={chatFooter}>
        <AddAPhotoIcon style={photoIcon}/>
        <MessageForm handleChange={handleChange} sendMessage={sendMessage} value={value}/>
        <MicIcon />
      </div>
    </div>
  );
};

export default MessagesView;