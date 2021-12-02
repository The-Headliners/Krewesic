import axios from 'axios';
import React, {useState, useEffect, useContext, useCallback} from 'react';
import MyChats from './MyChats.jsx';
import {v4} from 'uuid';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const StyledVideoChat = styled.div`
  .wrapper {

  }
  .friend {
    padding: 20px;
    width: 350px;
    display: flex;
    flex-direction: row;
  }
  .friendWrapper {
    display: flex;
    flex-direction: row;
  }
  .chatButton {
    background-color: ${props => props.theme.colorMed};
    color: ${props => props.theme.textColorLight}
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
    const thisUserChats = allChats.filter(chat => {
      return chat.attendees.includes(userId.toString()) && chat.attendees.includes(id.toString());
    });
    if (thisUserChats.length) {
      return;
    }
  
    const uuid = v4();
    const chatObj = { code: uuid, attendees: [id, userId]};
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

  const notifyOtherUser = useCallback((userId) => {
    const uuid = v4();
    socket.emit('notify', {
      id: userId, 
      notification: {
        body: `${name} wants to video chat with you`,
        code: uuid,
        creator: id,
        other: userId,
      }
    });
    
  });

  const goToChat = useCallback((chatObj) => {
    const {code, creatorId, attendees} = chatObj;
    const creator = attendees[0];
    const other = attendees[1];

    history.push(`/conferenceCall/${code}/${creator}/${other}`);

  });


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
            if (user.id !== id) {
              return <div 
                key={i}
                className='friendWrapper'
              >
                <div className='friend clickableDark' onClick={() => createVideoChat(user.id)}>{user.name} </div>

                <MyChats goToChat={goToChat} notifyOtherUser={notifyOtherUser} allMyChats={allChats} userId={user.id} />
              </div>;
            }
            
          })}
        </div>
  
      </div>
    </StyledVideoChat>
  );
};

export default VideoChats;
