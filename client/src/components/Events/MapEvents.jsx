import React, {useState, useEffect} from 'react';
import { Button} from '@material-ui/core/';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import Map from './Map.jsx';
import styled from 'styled-components';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

import { alpha } from '@material-ui/core/styles'; 
import { LocalizationProvider } from '@mui/lab';
import Grid from '@mui/material/Grid';

const StyledMapEvents = styled.div`
  .wrapper {
    background-color: ${props => props.theme.colorBackground};
    padding: 20px;
    width: 80vw;
    margin: auto;
    align-items: center;
    display: flex;
    justify-content: center;
    
  }

  .inputField {
    background-color: white;
    border-radius: 3px;
    margin: 10px;
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
`;


//import './sample.json';


const MapEvents = () => {

  const [bandName, setBandName] = useState('');
  const [city, setCity] = useState('New Orleans');
  const [events, setEvents] = useState([]);
  //const [value, setValue] = useState(DateTime.now)
  const [date1, setDate1] = useState('2021-11-11');
  const [date2, setDate2] = useState('2021-11-13');

  const [krewesicEvents, setKrewesicEvents] = useState([]);

  const searchBand = async() => {
    //send bandName to the back end
    const {data} = await axios.get(`/events/bandSearch/${bandName}`);

    //right now hard coded to receive sample data so not use api key too much
    // const {data} = await axios.get('/events/sampleData');


    //clear the input text
  };

  const searchCity = async() => {

    //const {data} = await axios.get(`/events/citySearch/`${city});

    //right now hard coded to retreive sample data so not use api key too much
    const {data} = await axios.get('/events/sampleCity');
  };

  const searchDate = async() => {
    //const {data} = await axios.get('/events/dateSearch') <-- include start date, fin date, city
    const {data} = await axios.get('/events/sampleLocalWeekend');
    setEvents(data);
  };

  const findLocalShows = async() => {
    const {data} = await axios.get(`/events/dateSearch/${date1}/${date2}/${city}`);
    setEvents(data);

    const kEvents = await axios.get('/krewesicevents/liveevents');
    setKrewesicEvents(kEvents.data);

  };




  return (
    <StyledMapEvents>
      <Grid container spacing={3} className='wrapper'>
        <Grid container justifContenty='space-between' spacing={1} item sm={12} lg={6}>
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InputLabel htmlFor='startDateInput' className='labels'>Between YYYY-MM-DD</InputLabel>
            <TextField 
              id='startDateInput'
              variant="outlined" 
              margin='dense'
              InputLabelProps={{style: {color: 'white', marginBottom: '5px'} }}
              className='inputField' 
              placeholder='YYYY-MM-DD' 
              onChange={(e)=>setDate1(e.target.value)} 
              value={date1} 
            />
          </Grid>
      
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <InputLabel htmlFor='endDateInput' className='labels'>Until YYYY-MM-DD</InputLabel>
            <TextField 
              id='endDateInput'
              variant="outlined" 
              margin='dense'
              className='inputField' 
              placeholder='YYYY-MM-DD' 
              onChange={(e)=>setDate2(e.target.value)} 
              value={date2} 
              label='end date'
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
              label='city'
              value={city} 
            />
          </Grid>
            
          <Grid item xs={6} sm={4} md={4} lg={6} alignSelf='flex-end'>
            <Button className='showButton' onClick={findLocalShows}>find local shows</Button>
          </Grid>
           
        
    
    
        </Grid>
        <Grid item sm={12} lg={6}>
          <Map events={events} kEvents={krewesicEvents} />
        </Grid>

      
        
      </Grid>

    </StyledMapEvents>
  );
};

export default MapEvents;

/**
 * Query String Parameters
Your can add client_id and optionally client_secret to the end of any valid url to authenticate your request.
 */
//http://platform.seatgeek.com/

/**
 * curl https://api.seatgeek.com/2/events?client_id=MYCLIENTID
curl https://api.seatgeek.com/2/events?client_id=MYCLIENTID&client_secret=MYCLIENTSECRET
 */

/**
 * 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
       
          <KeyboardDatePicker
            label="material date picker"
            value={date1}
            onChange={(e)=>setDate1(e.target.value)}
          />
        </MuiPickersUtilsProvider>
 */

/*
            background-color: ${props => props.theme.colorBackground};
    padding: 20px;
    width: 80vw;
    margin: auto;
    align-items: center;
    display: flex;
    justify-content: center;
    */