import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import CommentComponent from '../CommentComponent.jsx';
import styled from 'styled-components';
import GlobalContext from '../../Contexts/GlobalContext.jsx';
import {useHistory} from 'react-router-dom';
import VisitProfile from '../../Profile/VisitProfile.jsx';
import {format} from 'date-fns';





const StyledLanding = styled.div`
  .landingButton {
    background-color: ${props => props.theme.colorLight};
    color: ${props => props.theme.textLight}
  }
  .commentInput {
    width: 600px;
    margin-bottom: 20px;
  }
`;

const KreweEventLandingPage = () => {
  const {eventId} = useParams();
  // const eventId = 1; //hardcoded for testing

  const {id} = useContext(GlobalContext);
  const history = useHistory();


  const [artist, setArtist] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [artistId, setArtistId] = useState('');

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentWall, setCommentWall] = useState([]);

  const [code, setCode] = useState('');


  //const user = useGetUser();
  //do get request for the event info
  const getEventDeetz = async () => {
    const {data} = await axios.get(`/krewesicevents/event/${eventId}`);
    setArtist(data.User.name);
    //setDateTime(data.when);
    setVenue(data.venue);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setCode(data.code);
    setArtistId(data.User.id);
    const when = new Date(data.when.slice(0, -5));
  
    const formattedDate = format(when, 'MM.dd.yyyy h:mm aaa', { timeZone: 'America/Chicago'},);
    setDateTime(formattedDate);
  };



  const getInterestedUsers = async () => {
    const {data} = await axios.get(`/krewesicevents/interestedUsers/${eventId}`);
    setInterestedUsers(data);
    const iU = data.filter(x => x.User.id === id);
    iU.length && setAlreadyInterested(true);
  };

  const postInterest = async () => {
    await axios.post('/krewesicevents/interestedUser', {eventId});
    getInterestedUsers();
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


  useEffect(async () => {
    getEventDeetz();
    getCommentWall();
    const interested = await getInterestedUsers();
  }, []);



  const disinterest = async () => {
    await axios.delete(`/krewesicevents/removeInterest/${eventId}`);
    getInterestedUsers();
    setAlreadyInterested(false);
  };

  const visitProfile = (id) => {
    history.push(`/visitProfile/${id}`);
  };

  const redirectToShow = () => {
    history.push(`/virtualevent/${code}/${artistId}/${artist}`);
  };


  return (
    <StyledLanding>
      <div>

        <h1>{artist}</h1>
        <div>{dateTime}</div>
        <div>{address}</div>
        <div>{city}, {state}</div>
        <div>{venue}</div>

        <div>
          { alreadyInterested ? <Button className='landingButton' onClick={disinterest}>disinterest </Button> : <Button className='landingButton' onClick={postInterest}>interested</Button>}
        </div>
        <div>
          <h3>interested users</h3>
          {interestedUsers.map((user, i) => <div onClick={() => visitProfile(user.User.id)} key={i}>{user.User.name}</div>)}
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
        <Button className='landingButton' onClick={redirectToShow}>liveStream</Button>
      </div>
    </StyledLanding>
  );
};

export default KreweEventLandingPage;