import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { async } from 'regenerator-runtime';


const Conversation = ({conversation, currentUser}) => {

  //hold state of user dealing with the conversation involved
  const [user, setUser] = useState('');



  //find the other user that the current user is having a conversation with

  useEffect(() => {
    let receiver;
    conversation.senderId === currentUser.googleId ? receiver = conversation.receiverId : receiver = conversation.senderId;

    const getUser = async() => {
      try {
        const res = await axios(`/directMessage//usersId/${receiver}`);

        setUser(res.data[0]);
      } catch (err) {
        console.warn(err);
      }
    };

    getUser();
  }, [conversation, currentUser]);

  const Conversation = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: 'blue'
    }
  };

  const conversationImg = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  };

  const conversationName = {
    fontWeight: '500'
  };
  //to render the conversations
  return (
    <div className='conversation' style={Conversation}>
      <img className='conversationImg' src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt="" style={conversationImg} />
      <span className="conversationName" style={conversationName}>{user?.name} </span>
    </div>
  );
};

export default Conversation;
