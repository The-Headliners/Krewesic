import React, {useContext} from 'react';
import GlobalContext from './Contexts/GlobalContext.jsx';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const StyledHeader = styled.div`
  .bar {
    background-color: #190331;
    padding: 5px;
  }
 .wrapper {
  display: flex;
 flex-direction: row;
 justify-content: space-between;
 }

 .btn {
   margin-left: 10px;
   background-color: #cec387; 
 
 }
 .flexChild {
   
 }
`;




const Header = (props) => {

  const {name, setName, type, setType, loggedIn, setLoggedIn} = useContext(GlobalContext);
 
  //to logout: call the logout endpoint
  //will need additional work to redirect, after we have better idea of where to redirect to.
  const logout = async () => {
    await axios.get('/auth/logout');
    setName('');
    setType('');
    setLoggedIn(false);
    //history pusch redirect to wherever should be redirected to

  };
  
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
          <Typography>Logo</Typography>
          {display()}
        </div>        
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
