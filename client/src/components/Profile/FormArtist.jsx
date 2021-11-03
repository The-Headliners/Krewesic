
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
import Box from '@material-ui/core/Box';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';


const StyledFormArtist = styled.div`
background-color: ${props => props.theme.colorDark};
text-align: center;
.mainHeader: {
  color: pink;
}
.yo: {
  display: flex
  text-align: right;
}
`;


const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 100
  }
}));

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
    if (data.pic === '') {
      data.pic = 'https://cdn4.iconfinder.com/data/icons/staff-management-vol-1/72/38-512.png';
    }
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

  const classes = useStyles();

  return (
    <StyledFormArtist>
      <br/>
      <div
        //className='mainHeader'
      >
        <Typography
          style={{ color: '#c3c2c5', marginBottom: '10'}}
          align='center'
          variant='h4'>Artist Profile Creation</Typography>
      </div>
      <br/>
      <TextField
        onChange={e => setMyName(e.target.value)}
        id="outlined-basic"
        label="My Artist Name"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/><br/>
      <TextField
        onChange={e => setMyBio(e.target.value)}
        label="Bio"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/>
      <br/>
      <TextField
        onChange={e => setInfluence(e.target.value)}
        id="outlined-basic"
        label="Influences"
        style={{ backgroundColor: '#a2a1a7' }}
        variant="outlined" />
      <br/>
      <br/>
      <div

      >
        <FormControl
          style={{minWidth: 225}}

        >
          <InputLabel
            style={{ backgroundColor: '#a2a1a7', paddingTop: 0, paddingBottom: 0 }}
            id="demo-simple-select-label" >My Genre</InputLabel>
          <Select
            onChange={e => setMyGenre(e.target.value)}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="My Genre"
            style={{ backgroundColor: '#a2a1a7', paddingTop: 0, paddingBottom: 0 }}
          >
            <MenuItem

              value={'Rock'}>Rock</MenuItem>
            <MenuItem

              value={'Pop'}>Pop</MenuItem>
            <MenuItem

              value={'Hip Hop'}>Hip Hop</MenuItem>
            <MenuItem

              value={'Indie'}>Indie</MenuItem>
            <MenuItem

              value={'Metal'}>Metal</MenuItem>
            <MenuItem

              value={'Country'}>Country</MenuItem>
            <MenuItem

              value={'House'}>House</MenuItem>
          </Select>
          <br/>
        </FormControl>
      </div>
      <TextField
        onChange={e => setCity(e.target.value)}
        id="outlined-basic"
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
          onClick={handleCreate}
          href='/DiscoverArtists'
          style={{ backgroundColor: '#610094' }}
          variant="contained"
          startIcon={ <AccountCircle/> }
        > Create Profile </Button>
      </div>
      <br/><br/>
    </StyledFormArtist>
  );
};

export default FormArtist;