import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

const StyledChat = styled.div`
  .wrapper {
    background-color: pink; 
  }
`;

const StreamChat = ({socket, showId}) => {

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]); 

  const sendMessage = async () => {
    if (message) {
      const messageObj = {
        showId: showId,
        // username: username, //get this from context or cookie or somethin
        message: message,
        
      };

      await socket.emit('liveStreamMessage', messageObj);
      setAllMessages(list => [...list, messageObj]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receiveLiveStreamMessage', (message) => {
      console.log('receiveLSM', message);
      setAllMessages((list) => [...list, message]);
    });
  }, []);

  return (
    <StyledChat>
      <div className='wrapper'>
      chat component goes here
        <div>
          {allMessages.map((message, i) => <div key={i}>{message.message}</div>)}
        </div>

        <div>
          <TextField
            onChange={e => setMessage(e.target.value)}
            className='inputBackground'
            id="outlined-basic"
            label="send chat message"
            variant="outlined" />
          <Button onClick={sendMessage}>send</Button>
        </div>
      
      </div>
    </StyledChat>
  );
};

export default StreamChat;
