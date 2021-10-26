import React, { reactDOM, useContext, useState, useEffect} from 'react';
import axios from 'axios';







const Artist = ({user, key}) => {
  const [ word, setWord] = useState('');




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
        onClick={() => {
          axios.get(`/form/oneUser/${user.id}`)
            .then(({data}) => {
              console.log(data);
            });
        }}
      >Go To Profile</button>
      <hr></hr>
    </div>
  );

};



export default Artist;