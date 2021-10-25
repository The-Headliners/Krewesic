import React, {useState, useEffect, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import CommentComponent from './CommentComponent.jsx';
import { TextField, MenuItem, Button } from '@material-ui/core';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import styled from 'styled-components';

const StyledLanding = styled.div`
  .landingButton {
    background-color: #b3a970; 
  }
  .commentInput {
    width: 600px;
    margin-bottom: 20px;
  }
`;

const EventLandingPage = () => {
  
  const {eventId, venue, city, performers, datetime, lat, lng, type: type } = useParams();
  const {id} = useContext(GlobalContext);

  //this should be displaying: performers, datetime, city, venue name, lat lng, users who are interested, comments about this event, link to the ticket sales to satisfy TOS

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentWall, setCommentWall] = useState([]);



  const getInterestedUsers = async (sgId) => {
    const {data} = await axios.get(`/events/interestedUsersSG/${sgId}`);
    setInterestedUsers(data);
    console.log('data', data);
    const iU = data.filter(x => x.User.id === id);
    console.log( 'interestedUsersU', iU);
    iU.length && setAlreadyInterested(true);
    console.log('interested users', interestedUsers);
  };

  const interest = async () => {
    await axios.post('/events/interestedInSG', {eventId: eventId, venue: venue, performers: performers, when: datetime, lat: lat, lng: lng, city: city, type: type});
    setAlreadyInterested(true);
    getInterestedUsers(eventId);
  };

  

  const comment = async () => {
    await axios.post('/events/SGcomment', {comment: commentText, SGEventId: eventId});
    setCommentText('');
    getComments();
  };

  const getComments = async () => {
    const {data} = await axios.get(`/events/SGcomments/${eventId}`);
    setCommentWall(data.reverse());
  };

  const disinterest = async () => {
    await axios.delete(`/events/removeInterest/${eventId}`);
    setAlreadyInterested(false);
    getInterestedUsers();
  };

  useEffect(() => {
    getInterestedUsers(eventId);
    getComments();

  }, []);


  return (
    <StyledLanding >
      <div>
        <div>{performers.split(',').map((performer, i) => <h1 key={i} >{performer}</h1>)}</div>

        <h2>{venue}, {city} </h2>
        <h3>{datetime} </h3>
        {!alreadyInterested && <Button className='landingButton' onClick={interest}>interested</Button>}
        {alreadyInterested && <Button className='landingButton' onClick={disinterest}>remove interest </Button>}

        <div>
          <h3>interested users</h3>
          <div>
            {interestedUsers.map((user, i) => <div key={i} >{user.User.name}</div>)}
          
          </div>
        </div>

        <div>
          <h3>comment wall</h3>
          <TextField
            placeholder='insightful and witty commentary'
            className='inputBackground commentInput'
            variant="outlined"
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <Button className='landingButton' onClick={comment}>send comment</Button>

          <div>
            {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
          </div>

        </div>


      </div>
    </StyledLanding>
  );
};

export default EventLandingPage;
