import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';


const Krewe = ({ artist }) => {
  const [ artistAlbum, setArtistAlbum] = useState('');
  const [ albumDesc, setAlbumDesc ] = useState('');


  const randomAlbum = () => {
    setAlbumDesc('Record:');
  };


  return (
    <Box
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}
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
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        {albumDesc} {artistAlbum}
      </Box>
    </Box>
  );
};

export default Krewe;