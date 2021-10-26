import React, { reactDOM, useContext, useState, useEffect} from 'react';








const Artist = ({user}) => {
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
      <button>Go To Profile</button>
      <hr></hr>
    </div>
  );

};



export default Artist;