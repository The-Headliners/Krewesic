import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const KreweEventLandingPage = () => {
  const {eventId} = useParams();

  const [artist, setArtist] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
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


  return (
    <div>
   
      <h1>{artist}</h1>
      <div>{dateTime}</div>
      <div>{address}</div>
      <div>{city}, {state}</div>
      <div>{venue}</div>
      <button onClick={getEventDeetz}>get event info</button>
    </div>
  );
};

export default KreweEventLandingPage;
