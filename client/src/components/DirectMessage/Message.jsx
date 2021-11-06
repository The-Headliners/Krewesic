import React, {useState, useEffect, useContext} from 'react';


const Message = ({message, owner, currentUser}) => {

 


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

  //to render the actual message
  return (
    <div className='message' style={message.name === currentUser.name ? ownMessage : Message}>
      <div className='messageTop'>
        <img className='messageImg' style={messageImg} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIbCHBytowb0SiotsKsEzRFiJ37uH8GqkA-A&usqp=CAU" alt=""/>
        {message.name}
        {/* <div className='username'>{message.name}</div>  */}
        <p className="messageText" style={message.name === currentUser.name ? ownMessageText : messageText}> {message.text} </p>
      </div>
      {/* <div className="messageDate">{message.createdAt}</div> */}
      <div className='messageBottom' style={messageBottom}> 1 hour ago</div>
    </div>
  );
};

export default Message;