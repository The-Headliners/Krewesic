import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'; 
import {format} from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';



const StyledPreview = styled.div`

  .preview {
    background-color: ${props => props.theme.colorBackground};
    color: ${props => props.theme.textColorLight};
  }

  .headliners {
    margin: 10px; 
    margin-left: 50px;
    color: white;
  }
  .date {
    margin-left: 50px;
  }
`;

const EventPreview = ({eventDetails}) => {
  const history = useHistory();
  const {performers, id, User, when, venue, medium, type} = eventDetails;
  const {name, pic} = User;
  const [formattedDate] = useState(format(new Date(when), 'MM.dd.yyyy h:mm aaa', {timeZone: 'America/Chicago'} ));

  return (
    <StyledPreview>
      <Paper
        className='clickableLight preview'
        onClick={() => {
          history.push(`/kreweEventLandingPage/${id}`);
        }}>
        <Stack direction='row' className=''>
          <Avatar 
            alt={name} 
            src={pic} 
            style={{height: '100px', width: '100px', marginLeft: '50px'}} 
          />
          <Grid container 
            justifyContent='space-evently' 
            alignItems='center'
            className='wordsWrapper'>
            <Grid item lg={4}>
              <h3 className='headliners'>{name}</h3>
            </Grid>
            <Grid item lg={8}>
              <h4 className='showType'>{type}</h4>
            </Grid>
            <Grid item lg={4}>
              <h5 className='date'>{formattedDate}</h5>
            </Grid>
            <Grid item lg={8}>
              <h6 className='medium'>{medium === 'virtual' ? 'On Krewesic!' : venue}</h6>
            </Grid>            
          </Grid>
        
        </Stack>     
     
      </Paper>
    </StyledPreview>
  );
};

export default EventPreview;
