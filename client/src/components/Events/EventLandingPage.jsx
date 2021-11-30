import React, {useState, useEffect, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import CommentComponent from './CommentComponent.jsx';
import { TextField, MenuItem, Button } from '@mui/material';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import styled, {ThemeProvider} from 'styled-components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledLanding = styled.div`
  .landingButton {
    background-color: ${props => props.theme.colorLight};
  }
  .commentInput {
    width: 600px;
    margin-bottom: 20px;
  }
  h3 {
    color: ${props => props.theme.colorLight}
  }
  .billBoard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colorBackground};
    color: ${props => props.theme.textColorLight};
    height: 30vh;
    width: 45vw;
    margin: auto;
    margin-top: 50px;
    padding: 30px;
    border: 1px solid white;
   
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
    const iU = data.filter(x => x.User.id === id);
    iU.length && setAlreadyInterested(true);
  };

  const interest = async () => {
    await axios.post('/events/interestedInSG', {eventId: eventId, venue: venue, performers: performers, when: datetime, lat: lat, lng: lng, city: city, type: type});
    setAlreadyInterested(true);
    getInterestedUsers(eventId);
  };



  const comment = async () => {
    await axios.post('/events/SGcomment', {comment: commentText, SGEventId: eventId, venue: venue, performers: performers, when: datetime, lat: lat, lng: lng, city: city, type: type});
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

  const visitProfile = (id) => {
    history.push(`/visitProfile/${id}`);
  };

  useEffect(() => {
    getInterestedUsers(eventId);
    getComments();

  }, []);


  return (
    <StyledLanding >
      <div>
        <Paper className='billBoard'>
          <div>{performers.split(',').map((performer, i) => <h1 key={i} >{performer}</h1>)}</div>

          <h2>{venue}, {city} </h2>
          <h3>{datetime} </h3>
          {!alreadyInterested && <Button className='landingButton' onClick={interest}>interested</Button>}
          {alreadyInterested && <Button className='landingButton' onClick={disinterest}>remove interest </Button>}
        </Paper>
        <Grid container spacing={3} style={{margin: '30px'}}>
          <Grid item sx={3}>
            <div>
              <h2 style={{display: 'flex', justifyContent: 'center'}}>Interested Fans</h2>
              <div>
                {interestedUsers.map((user, i) => <div 
                  key={i}
                  onClick={() => visitProfile(user.User.id)}
                  className='clickableLight'
                >{user.User.name }</div>)}

              </div>
            </div>
          </Grid>

          <Grid item xs={9}>
          
            <h2 style={{paddingLeft: '30px'}}>Comment Wall</h2>
          

            <div>
              {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
            </div>
            <TextField
              placeholder='insightful and witty commentary'
              className='inputBackground commentInput'
              variant="outlined"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
            <Button className='landingButton' onClick={comment}>send comment</Button>

          </Grid>
        </Grid>


      </div>
    </StyledLanding>
  );
};

export default EventLandingPage;
