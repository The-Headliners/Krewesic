import axios from 'axios';
import React, {useState, useEffect, useContext, useRef} from 'react';
import { async } from 'regenerator-runtime';
import {v4} from 'uuid';
import useGetUser from '../CustomHooks/useGetUser.jsx';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

const backgroundColor = '#610094';
const StyledVideoChat = styled.div`
  .wrapper {

  }
  .friend {
    padding: 20px;
    width: 350px;
  }
  .chatButton {
    background-color: ${props => props.theme.colorMed};
  }
`;




const VideoChats = () => {
  const history = useHistory();
  const {id, socket, name} = useContext(GlobalContext);

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
    socket.emit('notify', {
      id: userId, 
      notification: {
        body: `${name} wants to video chat with you`,
        code: uuid,
        creator: id,
        other: userId
      }
    });
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
    <StyledVideoChat>
      <div className='wrapper'>
        <div className='allUsersWrapper'>
          <h1>All Friends</h1>
          {allUsers.map((user, i) => {

            return <div 
              key={i}
              onClick={() => createVideoChat(user.id)}
              className='friend clickableDark'
            >{user.name}</div>;
          })}
        </div>
        <div>
          {allChats.map((chatObj, i )=> <Button className='chatButton'
            key={i}
            onClick={() => goToChat(chatObj)}
          > created by: {chatObj.creator.name} roomId: {chatObj.code} </Button> )}
        </div>
      </div>
    </StyledVideoChat>
  );
};

export default VideoChats;
