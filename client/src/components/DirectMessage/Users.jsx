import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import GlobalContext from '../Contexts/GlobalContext.jsx';

const Users = ({currentUser}) => {

  const [users, setUsers] = useState([]);
  const {id} = useContext(GlobalContext);


  const getUser = async () => {
    const res = await axios.get('/directMessage/users');
    //console.log('res', res);

    try {
      setUsers(res.data);
    } catch (err) {
      console.warn(err);
    }

  };

  //event handler to create a conversation
  const createConversation = (otherId) => {
    const conversation = {
      senderId: id,
      receiverId: otherId,
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
        users.map(user => ( <div className='user' key={user.id} onClick={() => createConversation(user.googleId)}>{user.name}</div>))
      }
    </div>
  );
};

export default Users;