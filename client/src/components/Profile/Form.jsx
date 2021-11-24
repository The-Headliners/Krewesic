import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
//import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
// import Item from '@material-ui/core/Item'
import HeadsetIcon from '@mui/icons-material/Headset';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Typography from '@mui/material/Typography';


const Form = (props) => {

  //get user info
  const history = useHistory();

  const ListenerButton = () => {
    return (
      <Button
        startIcon={<HeadsetIcon />}
        style={{ backgroundColor: '#610094', justifyItems: 'center' }}
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
        style={{ backgroundColor: '#610094' }}
        variant='contained'
        onClick={() => {
          selectType('artist');
          history.push('/artistform');
        }} >Artist</Button>


    );
  };

  const selectType = (type) => {
    axios.put(`/form/setType/${type}`);
  };



  const FormStyles = styled.div`
  background-color: ${props => props.theme.colorBackground};
  box-sizing: border-box;
  .row {
    display: flex;
  }
  .column {
    text-align: center;
    flex: 50%;
    padding: 10px;
    height: 300px;
  }
`;


  return (
    <FormStyles>
      <Typography
        style={{ color: '#c3c2c5', marginBottom: '10'}}
        align='center'
        variant='h4'>Select Profile</Typography>
      <div className='row'>


        <div
          className='column'
        >

          <ListenerButton
          />
        </div>
        <div
          className='column'
        >

          <ArtistButton
          />
        </div>
      </div>
    </FormStyles>
  );
};

export default Form;
