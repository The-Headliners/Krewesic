import React, {useState, useEffect} from 'react';
import axios from 'axios';

/**
 * This is a custom hook to return the user object for any krewesic user.   Will return that user when the component mounts.
 *
 * @param {number} id  --this is the id of the user whose information you want
 * @returns the user object
 * to use the hook, in your component where you want to grab a users information, import this hook at the top just call the hook and set a variable equal to the return value..
 *   ex: const userObj = useGetUser(2);
 * ^will return the user object for the user who has an id of two and you will have access to it through userObj in that component.
 * Hooks rules still apply- hooks go in the order, and also cannot use inside loops or conditional statements or nested fns.
 */

//to get user by the id
const useGetUser = (id) => {
  const [user, setUser] = useState({});

  useEffect(async () => {
    const {data} = await axios.get(`/userProf/user/${id}`);
    setUser(data);
  }, []);

  return user;


};

export default useGetUser;