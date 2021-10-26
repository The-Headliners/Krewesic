import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { async } from 'regenerator-runtime';

const Users = ({currentUser}) => {

  const [users, setUsers] = useState([]);


  const getUser = async () => {
    const res = await axios.get('/directMessage/users');

    try {
      setUsers(res.data);
    } catch (err) {
      console.warn(err);
    }

  };

  //event handler to create a conversation
  const createConversation = (id) => {
    const conversation = {
      senderId: currentUser.googleId,
      receiverId: id,
    };
    axios.post('/chat/conversation', conversation);
  };
  useEffect(() => {
    getUser();
  }, []);
  //to render the actual message
  return (
    <div className='users'>
      All Users:
      {
        users.map(user => ( <div className='user' onClick={() => createConversation(user.googleId)}>{user.name}</div>))
      }
    </div>
  );
};

export default Users;