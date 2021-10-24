import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EventPreview from './EventPreview.jsx';
import {useHistory} from 'react-router-dom'; 



const KrewesicEvents = () => {

  const history = useHistory();
   
  const [events, setEvents] = useState([]);
  const [virtualEvents, setVirtualEvents] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  

  const getEvents = async () => {
    const {data} = await axios.get('/krewesicevents/allevents');
    console.log('data', data);
    setEvents(data);
  };

  const getVirtualEvents = async() => {
    const {data} = await axios.get('/krewesicevents/virtualevents');
    console.log('data', data);
    setVirtualEvents(data);
  };

  const getLiveEvents = async() => {
    const {data} = await axios.get('/krewesicevents/liveevents');
    console.log('data', data);
    setLiveEvents(data);
  };


  useEffect(() => {
    getEvents();
    getVirtualEvents();
    getLiveEvents();
  }, []);

  return (
    <div> 
      <div>
        <h3>all events</h3>
        {events.map((event, i) => <EventPreview 
          key={i} 
          eventDetails={event}
         
        />)}
      </div>
      <div>
        <h3>live events</h3>
        {liveEvents.map((event, i) => <EventPreview key={i} eventDetails={event} />)}
      </div>
      <div>
        <h3>virtual events</h3>
        {virtualEvents.map((event, i) => <EventPreview key={i} eventDetails={event} />)}
      </div>

    </div>
  );
};

export default KrewesicEvents;
