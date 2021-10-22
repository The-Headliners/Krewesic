
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import {MenuItem} from '@material-ui/core';


const FormArtist = () => {
  const [ artistBio, setMyBio ] = useState('');
  const [ artistName, setMyName ] = useState('');
  const [ myGenre, setMyGenre ] = useState('');
  const [ city, setCity ] = useState('');
  const [data, setData] = useState(null);


  const handleCreate = () => {
    const data = {
      artistBio: artistBio,
      artistName: artistName,
      myGenre: myGenre,
      city: city
    };
    axios.put('/form/createArtist', data).then(res => {
      setData(res.data);
      setMyBio('');
      setMyName('');
      setMyGenre('');
      setCity('');
    }).catch(err => {
      console.log('darn', err);
    });
  };

  return (
    <div>
      <br/>
      <Typography
        align='center'
        color='secondary'
        variant='h4'
      >What kind of Artist are you?</Typography>
      <br/>
      <TextField
        onChange={e => setMyName(e.target.value)}
        id="outlined-basic"
        label="My Artist Name"
        variant="outlined" />
      <br/><br/>
      <TextField
        onChange={e => setMyBio(e.target.value)}
        label="Bio"
        variant="outlined" />
      <br/>
      <br/>
      <FormControl fullWidth>
        <InputLabel >My Genre</InputLabel>
        <Select
          onChange={e => setMyGenre(e.target.value)}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="My Genre"
        >
          <MenuItem value={'Rock'}>Rock</MenuItem>
          <MenuItem value={'Pop'}>Pop</MenuItem>
          <MenuItem value={'Hip Hop'}>Hip Hop</MenuItem>
          <MenuItem value={'Indie'}>Indie</MenuItem>
          <MenuItem value={'Metal'}>Metal</MenuItem>
          <MenuItem value={'Country'}>Country</MenuItem>
          <MenuItem value={'House'}>House</MenuItem>
        </Select>
        <br/>
      </FormControl>
      <TextField
        onChange={e => setCity(e.target.value)}
        id="outlined-basic"
        label="My City"
        variant="outlined" />
      <br/>
      <br/>
      <Button
        onClick={handleCreate}
        href='/artistofday'
        color="primary"
        variant="contained"
        startIcon={ <AccountCircle/> }
      > Create Profile </Button>
      <br/><br/>

    </div>
  );
};

export default FormArtist;