import React, { reactDOM, useContext, useState, useEffect} from 'react';
import axios from 'axios';
import Prof from './Prof.jsx';






const Artist = ({user, key}) => {
  const [ word, setWord] = useState('');
  const [ userProf, setUserProf ] = useState([]);


  const getArtist = () => {
    axios.get(`/form/oneUser/${user.id}`)
      .then(({data}) => {
        console.log(data);

      });
  };

  return (
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
      <button
        // onClick={() => {axios.get(`/form/oneUser/${user.id}`).then(({data}) => {
        //       return <Prof
        //         prof={data}
        //       />;
        //     });
        // }}
        onClick={getArtist}
      >Go To Profile</button>
      <hr></hr>
    </div>
  );

};



export default Artist;