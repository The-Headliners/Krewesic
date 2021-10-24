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
import dummyData from './dummyData.js';
import keys from '../Events/keys.js';


// const StyledArtistOfDay = styled.div`
//   margin-top: 30px;
// `;



const ArtistOfDay = () => {

  const {name, setName, picture, setPicture, type, setType, loggedIn, setLoggedIn} = useContext(GlobalContext)
  const [ artistOfTheDay, setArtistOfTheDay ] = useState(dummyData.artists[0]);
  const [ artistList, setArtistList ] = useState([]);




  const list = [
    {
      firstname: 'First Name',
      lastname: 'Last Name',
    },
    {
      firstname: 'First Name',
      lastname: 'Last Name',
    },
  ];


  const renderArtistOfTheDay = async () => {
    await axios.get('/artistOfTheDay/artistOfTheDay')
      .then((data) => {
        console.log('dataaa: ', data);
        setArtistList(data.data);
      })
      .catch((err) => console.error(err));
    console.log(artistList);
  };

  useEffect(async() => {
    const {data} = await axios.get('/form/user');
    console.log(data);
    setName(data.name);
    setPicture(data.picture);
    setType(data.type);
    setLoggedIn(true);
    //renderArtistOfTheDay();
    console.log('picture', picture, 'type', type);

  }, []);


  return (
    <div className='dayHeader'>

      <h1>Today's Featured Artist:</h1>
      <Box display='flex' marginX='10vh' paddingX='10vh'>
        <div>
          <h1>
            {/*artistOfTheDay.strArtist*/}
          </h1>
         
        </div>
        <div>

        </div>
      </Box>
      <ul>
        <h2>Friends</h2>
        <ul>
          {/*list.map(item => (
            <li key={item.id}>
              <div>{item.id}</div>
              <div>{item.firstname} {item.lastname}</div>
            </li>
          ))*/}
        </ul>
      </ul>
    </div>

  );
};

export default ArtistOfDay;
//<img src={/*artistOfTheDay.strArtistThumb*/} width="200" height="200" alt='' />
// <div marginY="4vh">
           // {/*artistOfTheDay.strBiographyEN*/}
           // </div>