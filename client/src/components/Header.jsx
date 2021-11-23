import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from './Contexts/GlobalContext.jsx';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import axios from 'axios';
import logo from './images/KrewesicLight.png';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {useHistory} from 'react-router-dom';

const StyledHeader = styled.div`
  .bar {
    background-color: #150050;
    padding: 5px;
  }
 .wrapper {
  display: flex;
 flex-direction: column;
 border: 4px solid blue;
 justify-content: center;
 }

 .btn {
   float: right;
   margin-top: 20px;
   margin-right: 5px;
   color: ${props => props.theme.textColorLight};
   background-color: #610094;
   :hover {
     background-color: #3F0071;
   }

 }
 .flexChild {
  align-items: flex-end;
  text-align: right;
 }
 .logo {
   margin-top: 10px;
   height: 70px;
   width: 70px;
   text-align: left;
   align-items: left;
   justify-content: left;
 }
 .notifications {
  margin-top: 20px;
  text-align: center;
  justify-content: center;
 

 }

 @media screen and (max-width: 480px) {
  .notify {
    font-size: 12px;
  }
}
`;




const Header = (props) => {

  const history = useHistory(); 

  const {name, setName, type, setType, loggedIn, setLoggedIn, socket} = useContext(GlobalContext);

  const [notification, setNotification] = useState(''); //for now a string but in future array and have drop down menu for all notifications
  const [activeNotifications, setActiveNotifications] = useState(false);

  const [notificationStyles, setNotificationStyles] = useState(null);

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

  const activeNotificationStyling = () => {
    if (activeNotifications) {
      setNotificationStyles({
        backgroundColor: 'pink',
        border: '1px solid pink',
        borderRadius: '3px',
        padding: '5px'
      });
    } else {
      setNotificationStyles(null);
    }
  };

  //display: conditionally displays login button if user not logged in, or the name and type if logged in and a log out button.   resets the global state if logging out.
  //note: after more development, a hamburger menu shold be on the right of all this.  the logo should also be ... a logo

  const display = () => {
    return loggedIn
      ? <Grid
        item xs={4} md={4} sm={4} lg={4}
      > 
        <div 
          className='flexChild'
        >{name}</div>
        <Button 
          className='btn flexChild' 
          startIcon={ <LogoutIcon />} 
          onClick={logout}
        >logout</Button>
      </Grid>
      : <Grid
        item xs={4} md={4} sm={4} lg={4}
      ><a href='/auth/google'><Button startIcon={ <LoginIcon />} className='btn flexchild' >Log In</Button></a></Grid>;
  };


  return (
    <StyledHeader>
      <Grid container style={{ backgroundColor: '#150050'}}>
        <Grid item xs={4} md={4} sm={4} lg={4}>
          <img src={logo} alt='logo' className='logo'/>
        </Grid>
        <Grid
          item xs={4} md={4} sm={4} lg={4}
        >
          <div className="notifications notify clickableLight" style={notificationStyles} onClick={() => {
            setActiveNotifications(false);
            history.push('/videoChats');
     
          }} >{notification && activeNotifications && notification.notification.body}</div></Grid>

        {display()}
      </Grid>

    </StyledHeader>
  );
};

export default Header;
//<Typography>Logo</Typography>style={/*{backgroundColor: activeNotifications ? 'red' : 'blue'}*/}