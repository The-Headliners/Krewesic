
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';
//import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import {MenuItem } from '@mui/material';
import {makeStyles} from '@mui/styles';
import styled from 'styled-components';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const StyledFormArtist = styled.div`
background-color: ${props => props.theme.colorDark};
text-align: center;
align-items: stretch
.mainHeader: {
  color: pink;
}

@media screen and (max-width: 480px) {
  .typo {
    font-size: 26px;
  }
}

@media screen and (max-width: 600px) {
  .artiste {
      width: 75%;
  }

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
          className='typo'
          style={{ color: '#c3c2c5', marginBottom: '10'}}
          align='center'
          variant='h4'>Artist Profile Creation</Typography>
        <br/>
        <TextField
          onChange={e => setMyName(e.target.value)}
          id="outlined-basic"
          label="My Artist Name"
          className='artiste'
          style={{ backgroundColor: '#a2a1a7', width: '60%' }}
          variant="outlined" />
        <br/><br/>
        <TextField
          onChange={e => setMyBio(e.target.value)}
          label="Bio"
          style={{ backgroundColor: '#a2a1a7', width: '60%' }}
          variant="outlined" />
        <br/>
        <br/>
        <TextField
          onChange={e => setInfluence(e.target.value)}
          id="outlined-basic"
          label="Influences"
          style={{ backgroundColor: '#a2a1a7', width: '60%' }}
          variant="outlined" />
        <br/>
        <br/>
        <div

        >
          <FormControl
            className='formy'
            style={{width: '60%'}}

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
              defaultValue=''
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
          style={{ backgroundColor: '#a2a1a7', width: '60%' }}
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
            style={{ backgroundColor: '#610094', marginBottom: '20px' }}
            variant="contained"

          > Create Profile </Button>
        </div>
      </div>
      <br/>
      <Typography
        variant='h7'
      >All Rights Reserved, Krewesic ©</Typography>
    </StyledFormArtist>
  );
};

export default FormArtist;