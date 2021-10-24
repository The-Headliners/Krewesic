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
 .logo {
   height: 50px;
   width: 50px;
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
          <img src='https://export-download.canva.com/G8Nys/DAEtvsG8Nys/3/0/0001-10686997051.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20211024%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211024T080316Z&X-Amz-Expires=30299&X-Amz-Signature=0d1aed5b963affb1cb29ba2f29fd81f0fdbea7f630aa9d28ba495ffdddb36e2b&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Cream%2520and%2520Green%2520Circles%2520Art%2520%26%2520Design%2520Logo.png&response-expires=Sun%2C%2024%20Oct%202021%2016%3A28%3A15%20GMT' className='logo'/>
          {display()}
        </div>        
      </AppBar>
    </StyledHeader>
  );
};

export default Header;
//<Typography>Logo</Typography>