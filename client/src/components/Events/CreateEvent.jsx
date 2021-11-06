import React, {useState, useEffect, useContext} from 'react';
//import GlobalContext from './Contexts/GlobalContext.jsx';
import { MenuItem, } from '@material-ui/core';
import { FormControl, InputLabel, Select, TextField, Button, Grid} from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { LocalizationProvider } from '@mui/lab';
import {makeStyles} from '@material-ui/core';



const CreateEventStyled = styled.div`
  .wrapper {
    background-color: ${props => props.theme.colorBackground};
    padding: 30px;
  }
  .createButton {
    background-color: ${props => props.theme.colorLight};
    color: ${props => props.theme.textColorLight};
    height: 50px;
    margin-top: 30px;
  }
  .labels {
    color: ${props => props.theme.textColorLight};
  }

  .liveVenues {
    margin-left: 30px;
  }
`;


const CreateEvent = () => {

  //const classes = useStyles(); 
  //console.log('classes;', classes);

  const performers = 'performer names'; //this is going to be an array at some pt: needs, to match the format from the external api and also so more than one artist can be added to this event.  for starting, will just be the one artist who is adding, adding others will be a later addition.  will need to be .join(',') before being passed to req.body so can be stored in the db
  const [when, setWhen] = useState('');
  const [type, setType] = useState(''); //type will be musical performance, sports, meet and greet etc
  const [medium, setMedium] = useState('virtual'); //this will be the type of show: i.e. live or virtual.  
  //these are only to be displayed if live
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [venue, setVenue] = useState('');

  //link or code only if virtual, this is de-prioritized option
  //const [link, setLink] = useState('')
  //const [code, setCode] = useState('')
 
  const createEvent = async() => {
    //await getGeocode() 
    //right now the getGeocode fn runs on mouse over then this one on click.  need a better way to handle the asynchronous aspect of setting the state . 
    const stringWhen = when.toISOString();
 
    await axios.post('/events/createEvent', {performers, stringWhen, type, medium, address, city, state, venue});
    setWhen('');
    setType('');
    setMedium('virtual');
    setAddress('');
    setCity('');
    setState('');
    setVenue('');
  };


  return (
    <CreateEventStyled>
      <Grid container spacing={3} className='wrapper' alignItems='flex-start'>
        
        <Grid item lg={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputLabel className='labels'>When?</InputLabel>
            <DateTimePicker
            
              renderInput={(props) => <TextField className='inputBackground' {...props} />}
              label="DateTimePicker"
              value={when}
              onChange={(newDateTime) => {
                setWhen(newDateTime);
              }}
              className='inputBackground'
              label="when"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item lg={6}>
          <InputLabel htmlFor='type' style={{width: '100%'}} className='labels'>What Kind of Event?</InputLabel>
          <TextField
            id='type'
            onChange={e => setType(e.target.value)}
            className='inputBackground'
            label="type"
            variant="outlined"
            value={type}
            placeholder='ex: music performance, discussion..'
          />

        </Grid>
        <Grid container direction='column' item lg={8} spacing={4}>
          <Grid item>
            <InputLabel className='labels' htmlFor='venueSelect' >At a venue or virtual?</InputLabel>
            <FormControl id='venueSelect' fullWidth>
            
              <Select

                onChange={e => setMedium(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="medium"
                value={medium}
                className='inputBackground'
              >
                <MenuItem value={'virtual'}>Virtual</MenuItem>
                <MenuItem value={'venue'}>At a venue</MenuItem>
              </Select>
    
            </FormControl>
          </Grid>

          <Grid container spacing={3} item lg={4}>
            {medium === 'venue' &&
            <Grid container spacing={3}>  
              <Grid item lg={3} className='liveVenues'>
                <TextField
                  onChange={e => setAddress(e.target.value)}
                  className='inputBackground'
                  label="address"
                  variant="outlined"
                  value={address}
                  placeholder='100 rock-n-roll ave'
                />
              </Grid>
              <Grid item lg={3} className='liveVenues'>
                <TextField
                  onChange={e => setCity(e.target.value)}
                  className='inputBackground'
                  label="city"
                  variant="outlined"
                  value={city}
                  placeholder='city'
                />
              </Grid>
              <Grid item lg={3} className='liveVenues'>
                <TextField
                  onChange={e => setState(e.target.value)}
                  className='inputBackground'
                  label="state"
                  variant="outlined"
                  value={state}
                  placeholder='LA'
                />
              </Grid>
              <Grid item lg={3} className='liveVenues'>
                <TextField
                  onChange={e => setVenue(e.target.value)}
                  className='inputBackground'
                  label="venue"
                  variant="outlined"
                  value={venue}
                  placeholder='venue'
                />
              </Grid>
            </Grid>
            }
          
          </Grid>

        </Grid>
        <Grid item lg={4}>
          <Button align-self='center' className='createButton' onClick={createEvent}>create event!</Button>
        </Grid>
      </Grid>
    </CreateEventStyled>
  );
};

export default CreateEvent;


