import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {format} from 'date-fns';

const StyledCard = styled.div`
  color: black; 

  .bandName {
    background-color: #c298f8;
    border: 1px solid purple; 
    border-radius: 3px;
  }
`;


const KInfoCard = ({event}) => {
  const { performers, type, venue, id, lat, lng, User, address, city, state, } = event;
  
  const [when] = useState(format(new Date(event.when), 'MM.dd.yyy h:mm aaa'));

 
  const history = useHistory();

  const interestedIn = async() => {
    await axios.post('/interestedIn', {eventId: id, sgId: sgId, });
  };

  return (
    <StyledCard>
      <div>
        <div className='clickableLight bandName' onClick={() => { history.push(`/kreweEventLandingPage/${id}`); }}>
          {User.name}
        </div>
        <h4>{venue}</h4>
        <p>{when}</p>

      </div>
    </StyledCard>
  );
};

export default KInfoCard;
