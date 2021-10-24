import React from 'react';
import {useHistory} from 'react-router-dom'; 

const EventPreview = ({eventDetails}) => {
  const history = useHistory();
  const {performers, id, User, when, venue, medium} = eventDetails;
  const {name} = User;
  return (
    <div  
      className='clickableDark'
      onClick={() => {
        history.push(`/kreweEventLandingPage/${id}`);
      }}>
      <p>
        {name} {when} {medium === 'virtual' ? 'virtual' : venue}
      </p>
        
     
    </div>
  );
};

export default EventPreview;
