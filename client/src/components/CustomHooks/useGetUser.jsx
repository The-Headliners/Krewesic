import React, {useState, useEffect} from 'react';
import axios from 'axios';

//to get user by the id
const useGetUser = (id) => {
  const [user, setUser] = useState({});
  
  useEffect(async () => {
    const {data} = await axios.get(`/userProf/user/${id}`);
    console.log('data from custom hook;', data);
    setUser(data);
  }, []);

  return user;


};

export default useGetUser;