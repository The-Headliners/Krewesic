import axios from 'axios';
import React, {useState, useEffect, useContext, useRef} from 'react';
import { async } from 'regenerator-runtime';
import {v4} from 'uuid';
import useGetUser from '../CustomHooks/useGetUser.jsx';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import {useHistory} from 'react-router-dom';




const VideoChats = () => {
  const history = useHistory();
  const {id} = useContext(GlobalContext);

  const [allChats, setAllChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  
  const getMyChats = async () => {
    const chats = await axios.get('/userProf/videoChats');
    const mappedChats = chats.data.map(chat => {
      return {attendees: chat.includes, code: chat.code, creator: chat.User};
    });
    const myChats = mappedChats.filter(chat => chat.attendees.includes(id.toString()));
    setAllChats(myChats);
  };

  const createVideoChat = async (userId) => {
  
    const uuid = v4();
    const chatObj = { code: uuid, attendees: [id, userId]};
    //setAllChats(list => [...list, chatObj]);
    //post the video chat to db
    await axios.post('/userProf/newVideoChat', {code: uuid, includes: [id, userId], creatorId: id});
    getMyChats();
  };

  const goToChat = (chatObj) => {
    const {code, creatorId, attendees} = chatObj;
    const creator = attendees[0];
    const other = attendees[1];

    history.push(`/conferenceCall/${code}/${creator}/${other}`);

  };


  useEffect(async() => {
    const {data} = await axios.get('/userProf/allUsers');
    setAllUsers(data);

    const chats = await axios.get('/userProf/videoChats');
    const mappedChats = chats.data.map(chat => {
      return {attendees: chat.includes, code: chat.code, creator: chat.User};
    });
    const myChats = mappedChats.filter(chat => chat.attendees.includes(id.toString()));
    setAllChats(myChats);

  }, []);

  return (
    <div>
      <div className='allUsersWrapper'>
        {allUsers.map((user, i) => {

          return <div 
            key={i}
            onClick={() => createVideoChat(user.id)}
          >{user.name}</div>;
        })}
      </div>
      <div>
        {allChats.map((chatObj, i )=> <button 
          key={i}
          onClick={() => goToChat(chatObj)}
        > created by: {chatObj.creator.name} roomId: {chatObj.code} </button> )}
      </div>
      
    
    </div>
  );
};

export default VideoChats;
