import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import CommentComponent from './CommentComponent.jsx';
import { TextField, MenuItem, Button } from '@material-ui/core';

const EventLandingPage = () => {
  
  const {eventId, venue, city, performers, datetime, lat, lng, type: type } = useParams();

  //this should be displaying: performers, datetime, city, venue name, lat lng, users who are interested, comments about this event, link to the ticket sales to satisfy TOS

  const [interestedUsers, setInterestedUsers] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentWall, setCommentWall] = useState([]);

  const interest = async () => {
    await axios.post('/events/interestedInSG', {eventId: eventId, venue: venue, performers: performers, when: datetime, lat: lat, lng: lng, city: city, type: type});
    setAlreadyInterested(true);
  };

  const getInterestedUsers = async (sgId) => {
    const {data} = await axios.get(`/events/interestedUsersSG/${sgId}`);

   
    setInterestedUsers(data);
    //const userIds = data.map(x => x.User.id)
    //TODO: if user ids includes the current user, then alreadyINterested is true;  
  };

  const removeInterest = async () => {
    await axios.delete(`/events/removeInterest/${interestId}`);
  };

  const comment = async () => {
    await axios.post('/events/SGcomment', {comment: commentText, SGEventId: eventId});
    setCommentText('');
    getComments();
  };

  const getComments = async () => {
    const {data} = await axios.get(`/events/SGcomments/${eventId}`);
    console.log('get comments', data);
    setCommentWall(data.reverse());
  };

  const disinterest = async () => {
    // console.log('i need to fill this in');
  };

  useEffect(() => {
    getInterestedUsers(eventId);
    getComments();

  }, []);


  return (
    <div>
      <div>{performers.split(',').map((performer, i) => <h1 key={i} >{performer}</h1>)}</div>

      <h2>{venue}, {city} </h2>
      <h3>{datetime} </h3>
      {!alreadyInterested && <button onClick={interest}>interested</button>}
      {alreadyInterested && <button onClick={disinterest}>remove interest </button>}

      <div>
        <h3>interested users</h3>
        <ul>
          {interestedUsers.map((user, i) => <li key={i} >{user.User.name}</li>)}
          
        </ul>
      </div>

      <div>
        <h3>comment wall</h3>
        <TextField
          placeholder='insightful and witty commentary'
          className='inputBackground'
          variant="outlined"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <button onClick={comment}>send comment</button>

        <div>
          {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
        </div>

      </div>


    </div>
  );
};

export default EventLandingPage;
