import React, { reactDOM, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import Prof from './Prof.jsx';
import {Button} from '@material-ui/core';





const Artist = ({user, key}) => {
  const [ word, setWord] = useState('');
  const [ userProf, setUserProf ] = useState([]);


  const getArtist = () => {
    axios.get(`/form/oneUser/${user.id}`)
      .then(({data}) => {
        setUserProf(data);

      })
      .catch(err => console.warn(err));

  };

  return (
    <div>
      { userProf.length === 0 ?
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
            onClick={getArtist}
            // onClick={() => {
            //   axios.get(`/form/oneUser/${user.id}`)
            //     .then(({data}) => {
            //       return <Prof
            //         data={data}
            //       />;
            //     });
            // }}
            //href='/Prof'
          >Go To Profile</Button>
          <hr></hr>
        </div>
        :
        <div>
          {userProf.artistName}
          {userProf.artistBio}
          {userProf.myGenre}
          {userProf.influences}
        </div>
      }
    </div>
  );

};



export default Artist;