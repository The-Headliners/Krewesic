import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';


const Krewe = ({ artist }) => {
  const [ artistAlbum, setArtistAlbum] = useState('');
  const [ albumDesc, setAlbumDesc ] = useState('');


  const randomAlbum = () => {
    setAlbumDesc('Record:');
  };


  return (
    <Box
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
    >
      <Box
        style={{ display: 'flex', justifyContent: 'center'}}
        onClick={() => axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artist}`).then((data) => {
        //console.info(data.data.album);
          const randomValue = data.data.album[Math.floor(Math.random() * data.data.album.length)];
          //console.info(randomValue.strAlbum);
          setArtistAlbum(randomValue.strAlbum);
        })
          .then(() => randomAlbum())
        }
      >
        <li> {artist} </li>
      </Box>
      <Box
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}
      >
        {albumDesc} {artistAlbum}
      </Box>
    </Box>
  );
};

export default Krewe;