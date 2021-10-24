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
    //console.log('MY NEW FRIEND', receiver);
    
    const getUser = async() => {
      try {
        const res = await axios(`/directMessage//usersId/${receiver}`);
        console.log('MY NEW FRIEND', res.data[0].name);
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversation, currentUser]);

  console.log('right here', user);
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
