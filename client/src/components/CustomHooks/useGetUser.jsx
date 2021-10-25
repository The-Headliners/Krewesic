import React, {useState, useEffect} from 'react';
import axios from 'axios';

const useGetUser = () => {
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(async () => {
    const {data} = await axios.get('/form/user/:id');
    console.log('data from custom hook;', data);
    setCurrentUser(data);
  }, []);

  return currentUser;


};

export default useGetUser;