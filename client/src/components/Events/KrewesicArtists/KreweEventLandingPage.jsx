import React from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const KreweEventLandingPage = () => {
  const {eventId} = useParams();

  //do get request for the event info
  const getEventDeetz = () => {
    const {data} = axios.get(`/getEvent/${eventId}`);
    console.log(data);
  };


  return (
    <div>
      k e l p {eventId}
      <button onClick={getEventDeetz}>get event info</button>
    </div>
  );
};

export default KreweEventLandingPage;
