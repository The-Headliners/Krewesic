import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import FormListener from './FormListener.jsx';
import FormArtist from './FormArtist.jsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Item from '@material-ui/core/Item'
import HeadsetIcon from '@material-ui/icons/Headset';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
const Form = (props) => {
  //get user info
  const history = useHistory();

  const ListenerButton = () => {
    return (
      <Button
        startIcon={<HeadsetIcon />}
        color='primary'
        variant='contained'
        onClick={() => {
          selectType('listener');
          history.push('/listenerform');
        }} >Listener</Button>
    );
  };
  const ArtistButton = () => {
    return (

      <Button
        startIcon={<MusicNoteIcon />}
        color='primary'
        variant='contained'
        align='right'
        onClick={() => {
          selectType('artist');
          history.push('/artistform');
        }} >Artist</Button>


    );
  };

  const selectType = (type) => {
    axios.put(`/form/setType/${type}`);
  };
  return (
    <div className='backgroundColorLight'>

      <div>
        <Typography
          color='secondary'
          align='center'
          variant='h4'>Listener or Artist</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid item xs>
          <ListenerButton />
        </Grid>
        <Grid item xs={14}>
          <ArtistButton />
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
