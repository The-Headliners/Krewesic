import React, {useState, useEffect, useContext} from 'react';


const Message = ({message, owner}) => {

 


  //to render the actual message
  return (
    <div className='message'>
      <div className='message-card'>
        <p className="messageText">{message.text} </p>
      </div>
      <div className="messageDate">{message.createdAt}</div>
    </div>
  );
};

export default Message;