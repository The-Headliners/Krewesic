import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';



const Krewe = ({ artist }) => {
  const [ artistAlbum, setArtistAlbum] = useState('');



  return (
    <div
      onClick={() => axios.get(`https://theaudiodb.com/api/v1/json/523532/searchalbum.php?s=${artist}`).then((data) => {
        //console.info(data.data.album);
        const randomValue = data.data.album[Math.floor(Math.random() * data.data.album.length)];
        console.info(randomValue.strAlbum);
        setArtistAlbum(randomValue.strAlbum);
      })}
    >
      {artist} {artistAlbum}
    </div>
  );
};

export default Krewe;