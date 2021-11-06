import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
// import axios from 'axios';

const MessageForm = ({handleChange, sendMessage, value, chatMessageInput, chatSubmitButton}) => {

  // //need to hold the value of the message in state
  // const [value, setValue] = useState('');
  // // const [messages, setMessages] = useState([]);

  // //for live chat practice, create a chat array in state to hold the chat messages
  // const [chat, setChat] = useState([]);

  // const sendMessage = (event) => {
  //   event.preventDefault();
  //   //value from state is the message we want to bring back to the socket server
  //   //the name will be the current user logged in
  //   socket.emit('message', { name: 'Tre', message: value});
  //   setValue('');

  //   //where we need to send an axios post to create the message in the Messages db
  //   axios.post('/messages/sendMessage', { text: value })
  //     .then((results) => {
  //       console.log('messageCreated:', results);
  //     })
  //     .catch(err => {
  //       console.log('ERROR:', err);
  //     });
    
  // };
  // // const handleSubmit = (event) => {
  // //    event.preventDefault();
  // // }

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  //   //**Get all messages from current User*/
  //  const getMessages = () => {
  //    axios.get('/messages/sendMessage')
  //    .then( (results) => {
  //      setMessages(results.data)
  //    console.log('Messages:', results.data);
  //    })
  //    .catch( err => {
  //      console.log('ERROR!:', err);
  //    })
  //  }

  useEffect(() => {
    //getMessages();

    // socket.on('message', ({name, message}) => {
    //   setChat([...chat, {name, message: message}]);
    // });
  }, []);

  
  

  return (
    <div>
  
    </div>
    // <form className="message-form">
  // <input className="message-input" style={chatMessageInput} placeholder="Send a message..." value={value} onChange={handleChange} />

  // <Button className="message-button" variant="contained" style={chatSubmitButton} onClick={ (event) => sendMessage(event)}> send </Button>
  // </form>

  );
};

export default MessageForm;