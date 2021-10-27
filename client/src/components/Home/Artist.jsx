import React, { reactDOM, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import Prof from './Prof.jsx';
import {useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';





const Artist = ({user, key}) => {
  const [ word, setWord] = useState('');
  const [ userProf, setUserProf ] = useState([]);
  const history = useHistory();

  // const getArtist = () => {
  //   axios.get(`/form/oneUser/${user.id}`)
  //     .then(({data}) => {
  //       setUserProf(data);
  //       history.push(`/Prof/${userProf.id}`);
  //     }).catch(err => console.warn(err));

  // };

  const visitProfile = (user) => {
    console.info(user);
    history.push(`/visitProfile/${user}`);
  };

  return (
    <div
      onClick={() => visitProfile(user.id)}
    >
      <div>
        <p>{user.artistName}</p>
        <input
          onChange={e => setWord(e.target.value)}
        />
        <p>{word}</p>
        <img
          height={100}
          width={100}
          src={user.pic}></img>
        <p>{user.myGenre}</p>
        <p>{user.artistBio}</p>
        <p>{user.city}</p>
        <Button
          color="primary"
          //onClick={getArtist}
        >Go To Profile</Button>
        <hr></hr>
      </div>

    </div>
  );

};



export default Artist;