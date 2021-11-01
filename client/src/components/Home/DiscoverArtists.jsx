/* eslint-disable brace-style */
import React, { reactDOM, useContext, useState, useEffect} from 'react';
import {Router, Route, Link, RouteHandler} from 'react-router';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import keys from '../Events/keys.js';
import Artist from './Artist.jsx';



// const StyledArtistOfDay = styled.div`
//   margin-top: 30px;
// `;



const discoverArtists = () => {
  const [ userBase, setUserBase ] = useState([]);

  //IMPORTANT
  const {name, setName, picture, setPicture, type, setType, loggedIn, setLoggedIn, id, setId, socket} = useContext(GlobalContext);
  //IMPORTANT








  const renderUsers = async () => {
    await axios.get('/form/allUsers')
      .then(({data}) => {



        setUserBase(data);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(async() => {
    const {data} = await axios.get('/form/user');
    setName(data.name);
    setPicture(data.picture);
    setType(data.type);
    setLoggedIn(true);
    setId(data.id);
    renderUsers();
  }, []);




  return (
    <div className='dayHeader'>
      <h1>OUR ARTISTS</h1>
      <hr/>
      { userBase.map((user, i) => {
        if (user.type === 'artist') {
          return <Artist
            key={i}
            user={user}
          />;
        }
      }) }

    </div>

  );
};

export default discoverArtists;