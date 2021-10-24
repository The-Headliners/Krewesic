import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import CommentComponent from '../CommentComponent.jsx';

const KreweEventLandingPage = () => {
  const {eventId} = useParams();
  //const eventId = 1; //hardcoded for testing

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
  }, []);


  return (
    <div>
   
      <h1>{artist}</h1>
      <div>{dateTime}</div>
      <div>{address}</div>
      <div>{city}, {state}</div>
      <div>{venue}</div>

      <div>
        <button>interested</button>
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
        <button onClick={postComment}>send comment</button>

        <div>
          {commentWall.map((comment, i) => <CommentComponent key={i} comment={comment} />)}
        </div>

      </div>

    </div>
  );
};

export default KreweEventLandingPage;
