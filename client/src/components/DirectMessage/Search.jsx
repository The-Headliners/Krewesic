import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const Search = ({users, createConversation}) => {

  const [value, setValue] = useState('');
  const [userSearched, setUserSearched] = useState([]);


  const changeInput = (name) => {
    setValue(name);
  };

  // const searchUser = (user) => {
  //   return axios.get(`/directMessage/users/${user}`)
  //     .then(user => {
        
  //       setUserSearched(user.data);

  //     });
  // };

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
  const searchButton = {
    color: '#c3c2c5',
    backgroundColor: '#3F0071'
  };

  return (
    <div className='sidebar-search'>

      <div className='search-section'>
        <h5>Find a user </h5>
        <input type="text" className="chatMenuInput" style ={chatMenuInput} placeholder="Search for friends..." value={value} onChange={(e) => changeInput(e.target.value)}/>
        {/* <Button className="search-button" style={searchButton} onClick={() => searchUser(value)}> Search </Button> */}
      </div>

      <div className='user-preview'>
        {//conversations can be displayed under search
          //map over the userSearched, to render the user that was searched
          value === '' ? (<div className='userSearch' style={userSearch}>
  
          </div> ) : users.filter(user => {
            if (user.name.toLowerCase().includes(value.toLowerCase())) {
              return user;
            }
          }).map(user => {
            return (
              <div className='userSearch' key={user.id} style={userSearch}>
                <img className='searchImg' src={user.pic} alt="" style={searchImg} /> 
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