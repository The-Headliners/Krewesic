import React, { reactDOM, useContext, useState, useEffect} from 'react';
import Artist from './Artist.jsx';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Button} from '@material-ui/core';
import useGetUser from '../CustomHooks/useGetUser.jsx';


const Prof = () => {

  const {id} = useParams();

  const { name } = useGetUser(id);

  const getParams = () => {
    console.info(id, name);

  };


  useEffect(() => {
    getParams();
  });


  return (
    <div> <Button
      href='/DiscoverArtists'
      variant='contained'
      color='primary'
    >
      Discover Artists
    </Button>
    { name }
    </div>
  );
};

export default Prof;