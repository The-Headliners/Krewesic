import React, {useState, useEffect} from 'react';
import { Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import Map from './Map.jsx';
import styled from 'styled-components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { LocalizationProvider } from '@mui/lab';
import Grid from '@mui/material/Grid';

const StyledMapEvents = styled.div`
  height: 70vh; 

  .wrapper {
    background-color: ${props => props.theme.colorBackground};
    align-items: center;
    display: flex;
    justify-content: center;
    height: 80vh;
    
  }
  .datePick {
    background-color: white;
    color: grey;
  }

  .inputField {
    background-color: white;
    border-radius: 3px;
    margin: 10px;
    padding: 5px;
  }
  .showButton {
    background-color: ${props => props.theme.colorLight};
    color: ${props => props.theme.textColorLight};
    margin: 10px;
  }
  .labels {
    color: ${props => props.theme.textColorLight};
    font-size: 12px;
    margin-left: 15px;
  }
  @media screen and (max-width: 650px) {
  .wrapper {
    padding: 0px;
    margin-left: 0px;
  }
  .inputField {
    height: 40px;
  }
  .showButton {
    height: 43px;
  }
}
`;


const MapEvents = () => {

  const [bandName, setBandName] = useState('');
  const [city, setCity] = useState('New Orleans');
  const [events, setEvents] = useState([]);
  const [date1, setDate1] = useState(new Date());
  const [today] = useState(new Date())
  const [date2, setDate2] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()+7) );

  const [krewesicEvents, setKrewesicEvents] = useState([]);


  const findLocalShows = async() => {
    const date1String = date1.toISOString();
    const date2String = date2.toISOString();
    const {data} = await axios.get(`/events/dateSearch/${date1String}/${date2String}/${city}`);
    setEvents(data);
    const kEvents = await axios.get('/krewesicevents/liveevents');
    setKrewesicEvents(kEvents.data);

  };

  return (
    <StyledMapEvents>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3} className='wrapper'>
          <Grid container justifyContent='space-between' spacing={1} item sm={12} lg={6}>
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <InputLabel htmlFor='startDateInput' className='labels'>Between YYYY-MM-DD</InputLabel>
              <DatePicker 
                className='datePick'
                value={date1}
                onChange={newDate => setDate1(newDate)}
                renderInput={params => <TextField className='inputField' {...params} />}
              />
            </Grid>
      
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <InputLabel htmlFor='endDateInput' className='labels'>Until YYYY-MM-DD</InputLabel>
              <DatePicker 
                className='datePick'
                value={date2}
                onChange={newDate => setDate2(newDate)}
                renderInput={params => <TextField className='inputField' {...params} />}
              />
            </Grid>
       
            <Grid item xs={6} sm={4} md={4} lg={4} >
              <InputLabel htmlFor='cityInput' className='labels'>City</InputLabel>
              <TextField 
                id='cityInput'
                variant="outlined" 
                className='inputField' 
                placeholder='city' 
                onChange={(e)=>setCity(e.target.value)} 
                value={city} 
              />
            </Grid>
            
            <Grid item xs={6} sm={4} md={4} lg={6} alignSelf='flex-end'>
              <Button className='showButton' onClick={findLocalShows}>find local shows</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={6} >
            <Map events={events} kEvents={krewesicEvents} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </StyledMapEvents>
  );
};

export default MapEvents;


