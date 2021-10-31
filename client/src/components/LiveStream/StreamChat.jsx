import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import GlobalContext from '../Contexts/GlobalContext.jsx';

const StyledChat = styled.div`
  .wrapper {
    background-color: pink;
    color: navy; 
  }
`;

const StreamChat = ({socket, showId}) => {

  const {id} = useContext(GlobalContext);
  const {name} = useContext(GlobalContext);

  const [userName, setUserName] = useState(name);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]); 

  const sendMessage = async () => {
    if (message) {
      const messageObj = {
        showId: showId,
        // username: username, //get this from context or cookie or somethin
        message: message,
        name: userName

        
      };
     

      await socket.emit('liveStreamMessage', messageObj);
      setAllMessages(list => [...list, messageObj]);
      setMessage('');
    }
  };

  useEffect(() => {
    if (!name) {
      setUserName('anon');
    }
    socket.on('receiveLiveStreamMessage', (message) => {

      setAllMessages((list) => [...list, message]);
    });
  }, []);

  return (
    <StyledChat>
      <div className='wrapper'>
      chat component goes here
        <div>
          {allMessages.map((message, i) => <div key={i}>{message.message} from {message.name}</div>)}
        </div>

        <div>
          <TextField
            onChange={e => setMessage(e.target.value)}
            className='inputBackground'
            id="outlined-basic"
            label="send chat message"
            variant="outlined" 
            value={message}
          />
            
          <Button onClick={sendMessage}>send</Button>
        </div>
      
      </div>
    </StyledChat>
  );
};

export default StreamChat;
