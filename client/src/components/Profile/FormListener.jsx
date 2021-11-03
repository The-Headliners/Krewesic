import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import {MenuItem, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const FormListener = (props) => {
  const [ loading, setLoading ] = useState(false);
  const [ bio, setBio ] = useState('');
  const [ favArtist, setArtist ] = useState('');
  const [ favGenre, setGenre ] = useState('');
  const [ city, setCity ] = useState('');
  const [ pic, setPic] = useState('');
  const [ data, setData ] = useState(null);


  const handleSubmit = () => {
    const data = {
      bio: bio,
      favArtist: favArtist,
      favGenre: favGenre,
      city: city,
      pic: pic
    };
    if (data.pic === '') {
      data.pic = 'https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/38-512.png';
    }
    axios.put('/form/createListener', data).then(res => {
      setData(res.data);
      setBio('');
      setArtist('');
      setGenre('');
      setCity('');
      setPic('');
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


  const StyledFormListener = styled.div`
background-color: ${props => props.theme.colorDark};

.yo: {
  display: flex
  text-align: center;
}
`;



  return (
    <div
      style={{backgroundColor: '#150050', textAlign: 'center'}}
    >
      <br/>
      <div
        //className='mainHeader'
      >
        <Typography
          style={{ color: '#c3c2c5', marginBottom: '10'}}
          align='center'
          variant='h4'>Listener Profile Creation</Typography>
      </div>
      <br/>
      <TextField
        onChange={e => setBio(e.target.value)}
        label="Bio"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/><br/>
      <TextField
        onChange={e => setArtist(e.target.value)}
        id="outlined-basic"
        label="Favorite Artist"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/>
      <br/>
      <div>
        <FormControl
          style={{minWidth: 225}}
        >
          <InputLabel

          >Favorite Genre</InputLabel>
          <Select
            style={{ backgroundColor: '#a2a1a7' }}
            onChange={e => setGenre(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Favorite Genre"
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
      </div>
      <TextField
        onChange={e => setCity(e.target.value)}
        label="My City"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/>
      <br/>
      <Button
        variant="contained"
        component="label"
        style={{ backgroundColor: '#610094' }}
        startIcon={< AddAPhotoIcon />}
      >Profile Picture
        <input
          type="file"
          name="file"
          onChange={uploadImage}
          hidden
        />
      </Button>
      <br/>
      <br/>
      {loading ? (
        <h3>Loading...</h3>

      ) : (

        <img src={pic} style={{ width: '80px', borderRadius: '8px' }} />

      )}
      <br/>
      <br/>
      <div
        className='yo'
        style={{textAlign: 'center'}}
      >
        <Button
          onClick={handleSubmit}
          href='/DiscoverArtists'
          style={{ backgroundColor: '#610094' }}
          variant="contained"
          startIcon={ <AccountCircle/> }
        > Create Profile </Button>
      </div>
      <br/><br/>
    </div>
  );
};

export default FormListener;