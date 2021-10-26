import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const Search = () => {

  const [value, setValue] = useState('');
  const [userSearched, setUserSearched] = useState([]);


  const changeInput = (name) => {
    setValue(name);
  };

  const searchUser = (user) => {
    return axios.get(`/directMessage/users/${user}`)
      .then(user => {
        setUserSearched(user.data);

      });
  };


  return (
    <div className='sidebar-search'>

      <div className='search-section'>
        <h5>Find a user </h5>
        <input type="text" className="search-bar"placeholder="Find a user..." value={value} onChange={(e) => changeInput(e.target.value)}/>
        <button className="search-button" onClick={() => searchUser(value)}> Search </button>
      </div>

      <div className='user-preview'>
        {//conversations can be displayed under search
          //map over the userSearched, to render the user that was searched
          userSearched.map(user => {
            return (
              <h1>{user.name}</h1>
            );
          })
        }
      </div>
    </div>
  );
};

export default Search;