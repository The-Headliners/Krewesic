import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  color: black; 

  .bandName {
    background-color: #c298f8;
    border: 1px solid purple; 
    border-radius: 3px;
  }
`;


const InfoCard = ({event}) => {
  const {datetime_local, performers, type, venue, id, sgId, lat, lng } = event;
  
  const performersString = performers.map(performer => performer.name ).join(',');
  const history = useHistory();

  const interestedIn = async() => {
    await axios.post('/interestedIn', {eventId: id, sgId: sgId, });
  };

  return (
    <StyledCard>
      <div>
        <div className='clickableLight bandName' onClick={() => { history.push(`/eventLandingPage/${id}/${venue.name}/${venue.city}/${performersString}/${lat}/${lng}/${type}/${datetime_local}`); }}>
          {performers.map((performer, i) => <h3 key={i}>{performer.name}</h3>)}
        </div>
        <h4>{venue.name}</h4>
        <p>{datetime_local}</p>

      </div>
    </StyledCard>
  );
};

export default InfoCard;
