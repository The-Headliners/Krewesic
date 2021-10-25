import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import CommentComponent from '../CommentComponent.jsx';
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

const KreweEventLandingPage = () => {
  //const {eventId} = useParams();
  const eventId = 1; //hardcoded for testing

  const [artist, setArtist] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentWall, setCommentWall] = useState([]);

  //do get request for the event info
  const getEventDeetz = async () => {
    const {data} = await axios.get(`/krewesicevents/event/${eventId}`);
    //console.log(data);
    setArtist(data.User.name);
    setDateTime(data.when);
    setVenue(data.venue);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);

  };

  const postInterest = async () => {
    await axios.post('/krewesicevents/interestedUser', {eventId});
  };

  const getInterestedUsers = async () => {
    const {data} = await axios.get(`/krewesicevents/interestedUsers/${eventId}`);
    console.log(data);
    setInterestedUsers(data);
  };


  const getCommentWall = async() => {
    
    const {data} = await axios.get(`/krewesicevents/commentWall/${eventId}`);
    setCommentWall(data);
  };


  const postComment = async () => {
    await axios.post('/krewesicevents/postcomment', {comment: commentText, eventId: eventId});
    getCommentWall();
    setCommentText('');
  };

  useEffect(() => {
    getEventDeetz();
    getCommentWall();
    getInterestedUsers();
  }, []);


  return (
    <StyledLanding>
      <div>
   
        <h1>{artist}</h1>
        <div>{dateTime}</div>
        <div>{address}</div>
        <div>{city}, {state}</div>
        <div>{venue}</div>

        <div>
          <Button className='landingButton' onClick={postInterest}>interested</Button>
        </div>
        <div>
          <h3>interested users</h3>
          {interestedUsers.map((user, i) => <div>{user.User.name}</div>)}
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
          <Button className='landingButton' onClick={postComment}>send comment</Button>

          <div>
            {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
          </div>

        </div>

      </div>
    </StyledLanding>
  );
};

export default KreweEventLandingPage;
