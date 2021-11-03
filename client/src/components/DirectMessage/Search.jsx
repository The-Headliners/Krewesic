import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';

const Search = ({createConversation}) => {

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

  const chatMenuInput = {
    width: '90%',
    padding: '10px 0',
    border: 'none',
    borderBottom: '1px solid grey'
  };

  const searchImg = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  };

  const searchName = {
    fontWeight: '500'
  };

  const userSearch = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: 'blue'
    }
  };
  return (
    <div className='sidebar-search'>

      <div className='search-section'>
        <h5>Find a user </h5>
        <input type="text" className="chatMenuInput" style ={chatMenuInput} placeholder="Search for friends..." value={value} onChange={(e) => changeInput(e.target.value)}/>
        <button className="search-button" onClick={() => searchUser(value)}> Search </button>
      </div>

      <div className='user-preview'>
        {//conversations can be displayed under search
          //map over the userSearched, to render the user that was searched
          userSearched.map(user => {
            return (
              <div className='userSearch' style={userSearch}>
                <img className='searchImg' src="https://www.archiefoundationhome.org.uk/wp-content/uploads/2020/05/profile-photo-social-media.jpg" alt="" style={searchImg} /> 
                <span className='searchName' style={searchName} onClick={() => createConversation(user)}>{user.name} </span>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Search;