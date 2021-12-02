import React, {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import CommentComponent from '../CommentComponent.jsx';
import styled from 'styled-components';
import GlobalContext from '../../Contexts/GlobalContext.jsx';
import {useHistory} from 'react-router-dom';
import VisitProfile from '../../Profile/VisitProfile.jsx';
import {format} from 'date-fns';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';





const StyledLanding = styled.div`
  h1 {
    color: white;
  }
  .landingButton {
    background-color: ${props => props.theme.colorLight};
    color: ${props => props.theme.textLight};
    
  }
  .commentInput {
    width: 600px;
    margin-bottom: 20px;
  }
  .billBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colorBackground};
    color: ${props => props.theme.textColorLight};
    height: 30vh;
    width: 50vw;
    margin: auto;
    margin-top: 50px;
    padding: 30px;
    border: 1px solid white;
   
  }
  .description {
    margin: 10px;
    font-size: 16px;
  }
  .dateTime {
    margin-top: 30px;
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
  const [artistPic, setArtistPic] = useState('');
  const [artistName, setArtistName] = useState('');

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentWall, setCommentWall] = useState([]);
  


  const [code, setCode] = useState('');


  //const user = useGetUser();
  //do get request for the event info
  const getEventDeetz = async () => {
    const {data} = await axios.get(`/krewesicevents/event/${eventId}`);
    //console.log('data dot user', data.User)
    setArtist(data.User.name);
    setArtistName(data.User.artistName);
    //setDateTime(data.when);
    setVenue(data.venue);
    setAddress(data.address);
    setCity(data.city);
    setState(data.state);
    setCode(data.code);
    setArtistId(data.User.id);
    setArtistPic(data.User.pic);
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
    <StyledLanding >
      <div style={{marginLeft: '50px'}}>
        <div >
          <Paper className='billBoard'>
            <h2>{artistName ? artistName : artist}</h2>
            <Avatar style={{width: '70px', height: '40px'}} alt='artist image' src={artistPic} />
            <div className='description dateTime'>{dateTime}</div>
            <div className='description'>{address}</div>
            <div className='description'>{city} {state}</div>
            <div className='description'>{venue}</div>
            { alreadyInterested ? <Button className='landingButton' style={{color: '#c3c2c5' }} onClick={disinterest}>Disinterested </Button> : <Button className='landingButton' style={{color: '#c3c2c5' }} onClick={postInterest}>Interested</Button>}
          </Paper>
        </div>
       
        <Grid container style={{marginTop: '40px', borderTop: '1px solid grey'}} >
          <Grid item xs={3}>
            <div>
              <h3>Interested Users</h3>
              {interestedUsers.map((user, i) => <div className='clickableLight' onClick={() => visitProfile(user.User.id)} key={i}>{user.User.name}</div>)}
            </div>

          </Grid>
          <Grid item xs={9}>
            <div>
              <h3>Wall</h3>
              <TextField
                placeholder='insightful and witty commentary'
                className='inputBackground commentInput'
                variant="outlined"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
              />
              <Button className='landingButton' style={{color: '#c3c2c5' }} onClick={postComment}>send comment</Button>
            </div>
            <div>
              {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
            </div>


          </Grid>
         

         
      
     
        </Grid>
      </div>
    </StyledLanding>
  );
};

export default KreweEventLandingPage;