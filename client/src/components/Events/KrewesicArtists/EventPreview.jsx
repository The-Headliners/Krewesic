import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'; 
import {format} from 'date-fns';

const EventPreview = ({eventDetails}) => {
  const history = useHistory();
  const {performers, id, User, when, venue, medium} = eventDetails;
  const {name} = User;
  const [formattedDate] = useState(format(new Date(when.slice(-5)), 'MM.dd.yyyy h:mm aaa', {timeZone: 'America/Chicago'}));
  return (
    <div  
      className='clickableLight'
      onClick={() => {
        history.push(`/kreweEventLandingPage/${id}`);
      }}>
      <p>
        {name} {formattedDate} {medium === 'virtual' ? 'virtual' : venue}
      </p>
        
     
    </div>
  );
};

export default EventPreview;
