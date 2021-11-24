import React, { reactDOM, useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';






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
        <img
          style={{ borderRadius: '50%'}}
          height={100}
          width={100}
          src={user.pic}></img>
        <p>Artist: {user.artistName}</p>
        <p>Genre: {user.myGenre}</p>
        <hr
          style={{border: '1px solid #610094'}}
        ></hr>
      </div>
    </div>
  );

};



export default Artist;