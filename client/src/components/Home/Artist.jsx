import React, { reactDOM, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';





const Artist = ({user}) => {
  const [ word, setWord] = useState('');
  const [ userProf, setUserProf ] = useState([]);
  const history = useHistory();


  const visitProfile = (user) => {
    history.push(`/visitProfile/${user}`);
  };


  return (
    <div
      onClick={() => visitProfile(user.id)}
    >
      <div>
        <p>Artist: {user.artistName}</p>
        <img
          height={100}
          width={100}
          src={user.pic}></img>
        <p>Genre: {user.myGenre}</p>
        <p>City: {user.city}</p>
        <hr></hr>
      </div>
    </div>
  );

};



export default Artist;