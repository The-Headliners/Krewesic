import React, {useState, useEffect, useContext} from 'react';
//import GlobalContext from './Contexts/GlobalContext.jsx';
import { TextField, MenuItem, Button } from '@material-ui/core';
import { FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components';

const CreateEventStyled = styled.div`
  .wrapper {
    background-color: #c3a2e9;
    padding: 30px;
  }
`;


const CreateEvent = () => {

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

  //-- have instead of entering lat , long, they enter an address and use google geocoding api to get lat long in the db



 
  const createEvent = async() => {
    //await getGeocode() 
    //right now the getGeocode fn runs on mouse over then this one on click.  need a better way to handle the asynchronous aspect of setting the state .  
 
    axios.post('/events/createEvent', {performers, when, type, medium, address, city, state, venue});
  };


  return (
    <CreateEventStyled>
      <div className='wrapper'>
        <TextField
          onChange={e => setWhen(e.target.value)}
          className='inputBackground'
          label="when"
          variant="outlined"
          value={when}
          placeholder='YYYY-MM-DD HH:MM:SS'
        />
        <br/><br/>  
        <TextField
          onChange={e => setType(e.target.value)}
          className='inputBackground'
          label="type"
          variant="outlined"
          value={type}
          placeholder='ex: music performance, discussion..'
        />
        <br/><br/>
        <FormControl fullWidth>
          <InputLabel >at a venue or virtual?</InputLabel>
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
          <br/>
        </FormControl>
        <br/><br/>
        {medium === 'venue' &&
      <div>
         
        <TextField
          onChange={e => setAddress(e.target.value)}
          className='inputBackground'
          label="address"
          variant="outlined"
          value={address}
          placeholder='100 rock-n-roll ave'
        />
        <TextField
          onChange={e => setCity(e.target.value)}
          className='inputBackground'
          label="city"
          variant="outlined"
          value={city}
          placeholder='city'
        />
       
        <TextField
          onChange={e => setState(e.target.value)}
          className='inputBackground'
          label="state"
          variant="outlined"
          value={state}
          placeholder='LA'
        />
        <p>or</p>
    
      
        <br />
        <TextField
          onChange={e => setVenue(e.target.value)}
          className='inputBackground'
          label="venue"
          variant="outlined"
          value={venue}
          placeholder='venue'
        />
        <br />
      </div>
        }
        <Button onClick={createEvent}>create event!</Button>
      </div>
    </CreateEventStyled>
  );
};

export default CreateEvent;


