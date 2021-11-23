import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import Grid from '@mui/material/Grid';

const StyledChat = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .streamChatBtn {
    background-color: ${props => props.theme.colorLight};
    margin-left: 10px;
  }
  .msg {
    background-color: ${props => props.theme.colorLight};
    color: ${props => props.theme.textColorLight};
    padding: 10px;
    border: 1px solid black;
    border-radius: 3px;
  }
  .messagesWrapper {
    display: flex;
    flex-direction: column;
  }
  .senderName {
    font-size: 13px;
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
      <Grid container spacing={3} >
        <Grid item xs={12}>
          {allMessages.map((message, i) => <div className='msg' key={i}>{message.message} from <span className='senderName'>{message.name}</span></div>)}
        
        </Grid>

        <Grid item xs={12}>
          <TextField
            onChange={e => setMessage(e.target.value)}
            className='inputBackground inputStreamChat'
            id="outlined-basic"
            label="send chat message"
            variant="outlined" 
            value={message}
          />
            
          <Button className='streamChatBtn' onClick={sendMessage}>send</Button>
        </Grid>
      
      </Grid>
    </StyledChat>
  );
};

export default StreamChat;
