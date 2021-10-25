import React, {useState, useEffect, useContext} from 'react';


const Message = ({message, owner, currentUser}) => {

 


  //to render the actual message
  return (
    <div className='message' style={{position: 'relative', marginLeft: '500px' }}>
      <div className='message-card'>
        {/* <div className='username'>{message.name}</div>  */}
        <p className="messageText">{message.name}: {message.text} </p>
      </div>
      {/* <div className="messageDate">{message.createdAt}</div> */}
    </div>
  );
};

export default Message;