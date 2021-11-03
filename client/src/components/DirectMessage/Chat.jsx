import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { async } from 'regenerator-runtime';


const ChatOnline = ({conversation, currentUser}) => {

  // //hold state of user dealing with the conversation involved
  // const [user, setUser] = useState('ben');



  // //find the other user that the current user is having a conversation with

  // useEffect(() => {
  //   let receiver;
  //   conversation.senderId === currentUser.googleId ? receiver = conversation.receiverId : receiver = conversation.senderId;


  //   const getUser = async() => {
  //     try {
  //       const res = await axios(`/directMessage//usersId/${receiver}`);

  //       setUser(res.data[0]);
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };

  //   getUser();
  // }, [conversation, currentUser]);

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
      <div className='chatOnlineUser' style={chatOnlineUser}>
        <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
          <img className="chatOnlineImg" style={chatOnlineImg} src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt=""/>
          <div className='chatOnlineBadge' style={chatOnlineBadge}></div>
        </div>
      
        <div className='chatOnlineName'>
          {/* {user.name} */} Johnny Bravo
        </div>
      </div>

      <div className='chatOnlineUser' style={chatOnlineUser}>
        <div className="chatOnlineImgContainer" style={chatOnlineImgContainer}>
          <img className="chatOnlineImg" style={chatOnlineImg} src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt=""/>
          <div className='chatOnlineBadge' style={chatOnlineBadge}></div>
        </div>
      
        <div className='chatOnlineName'>
          {/* {user.name} */} Wesley Blake
        </div>
      </div>
    </div>
  );
};

export default ChatOnline;
