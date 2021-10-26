import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { async } from 'regenerator-runtime';


const ChatOnline = ({conversation, currentUser}) => {

  //hold state of user dealing with the conversation involved
  const [user, setUser] = useState('ben');



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

 
  //to render the conversations
  return (
    <div className='chatonline'>
      <div className='chatOnlineUser'>
        <div className='chatUserName'>
          {user.name}
        </div>
      </div>

    </div>
  );
};

export default ChatOnline;
