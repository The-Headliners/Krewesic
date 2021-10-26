import React, { reactDOM, useContext, useState, useEffect} from 'react';








const Artist = ({user}) => {


  return (
    <div>
      <p>{user.name}</p>
      <img
        height={100}
        width={100}
        src={user.pic}></img>
      <p>{user.type}</p>
      <p>{user.bio}</p>
      <p>{user.city}</p>
      <hr></hr>
    </div>
  );

};



export default Artist;