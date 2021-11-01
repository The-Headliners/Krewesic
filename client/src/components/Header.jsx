import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from './Contexts/GlobalContext.jsx';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import logo from './images/KrewesicCropped.png';

const StyledHeader = styled.div`
  .bar {
    background-color: #150050;
    padding: 5px;
  }
 .wrapper {
  display: flex;
 flex-direction: row;
 justify-content: space-between;
 }

 .btn {
   margin-left: 10px;
   background-color: #610094; 
   :hover {
     background-color: #3F0071;
   }
 
 }
 .flexChild {
   
 }
 .logo {
   height: 50px;
   width: 50px;
 }
`;




const Header = (props) => {

  const {name, setName, type, setType, loggedIn, setLoggedIn, socket} = useContext(GlobalContext);

  const [notification, setNotification] = useState(''); //for now a string but in future array and have drop down menu for all notifications 
  const [activeNotifications, setActiveNotifications] = useState(false);
 
  //to logout: call the logout endpoint
  //will need additional work to redirect, after we have better idea of where to redirect to.
  const logout = async () => {
    await axios.get('/auth/logout');
    setName('');
    setType('');
    setLoggedIn(false);
    //history pusch redirect to wherever should be redirected to
 
  };

  useEffect(() => {
    socket.on('notified', (data) => {
      //console.log('notified', data);
      setNotification(data);
      setActiveNotifications(true);
      //put in a redirect and description on notifications!!
    });
  }, []);
  
  //display: conditionally displays login button if user not logged in, or the name and type if logged in and a log out button.   resets the global state if logging out. 
  //note: after more development, a hamburger menu shold be on the right of all this.  the logo should also be ... a logo

  const display = () => {
    return loggedIn
      ? <Typography className='flexChild'>{name} type: {type} <Button className='btn' onClick={logout}>logout</Button></Typography>
      : <div ><a href='/auth/google'><Button className='btn flexchild' >Log In</Button></a></div>;
  };
  return (
    <StyledHeader>
      <AppBar position="static" className='bar' >
        <div className='wrapper'>
          <div className="notifications" onClick={() => setActiveNotifications(false)} style={{backgroundColor: activeNotifications ? 'red' : 'blue'}}>{notification && notification.notification.body}</div>
          <img src={logo} alt='logo' className='logo'/>
          {display()}
        </div>        
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
//<Typography>Logo</Typography>