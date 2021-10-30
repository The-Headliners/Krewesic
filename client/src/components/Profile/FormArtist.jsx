
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
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
const StyledFormArtist = styled.div`
  .wrapper {

  }
`;


const FormArtist = () => {
  const [ loading, setLoading ] = useState(false);
  const [ artistBio, setMyBio ] = useState('');
  const [ artistName, setMyName ] = useState('');
  const [ myGenre, setMyGenre ] = useState('');
  const [ city, setCity ] = useState('');
  const [ pic, setPic ] = useState('');
  const [ influences, setInfluence ] = useState('');
  const [data, setData] = useState(null);


  const handleCreate = () => {
    const data = {
      artistBio: artistBio,
      artistName: artistName,
      myGenre: myGenre,
      city: city,
      pic: pic,
      influences: influences,
    };
    axios.put('/form/createArtist', data).then(res => {
      setData(res.data);
      setMyBio('');
      setMyName('');
      setMyGenre('');
      setCity('');
      setPic('');
      setInfluence('');
    }).catch(err => {
      console.warn(err);
    });
  };


  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'cloveNsage');
    setLoading(true);
    const res = await fetch('https://api.cloudinary.com/v1_1/dxnzac0np/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();


    setPic(file.secure_url);
    setLoading(false);
  };



  return (
    <StyledFormArtist>
      <div className='backgroundColorLight '>
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
        <TextField
          onChange={e => setInfluence(e.target.value)}
          id="outlined-basic"
          label="Influences"
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
          variant="contained"
          component="label"
        >Profile Picture
          <input
            type="file"
            name="file"
            onChange={uploadImage}
            hidden
          />
        </Button>
        <br/>
        {loading ? (
          <h3>loading...</h3>

        ) : (
          <img src={pic} style={{ width: '50px' }} />
        )}
        <br/>
        <br/>
        <Button
          onClick={handleCreate}
          href='/DiscoverArtists'
          color="primary"
          variant="contained"
          startIcon={ <AccountCircle/> }
        > Create Profile </Button>
        <br/><br/>

      </div>
    </StyledFormArtist>
  );
};

export default FormArtist;