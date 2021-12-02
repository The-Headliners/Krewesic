import React from 'react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import logo from './images/Krewesic.png';

const LoginStyles = styled.div`
  background-color: #150050;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  .logo {
    width: 200px;
  }
`;

const Login = () => (
  <LoginStyles>


    <div
      style={{ height: '100vh' }}
      align='center'
    >
      <img src={logo} className='logo' alt='logo' />
      <h1 >Find Your Krewe And Music To March To</h1>

      <br/>
      <div
        align='center'
      ><a href='/auth/google'><Button
          startIcon={ <LoginIcon />}
          style={{ backgroundColor: '#610094', marginBottom: '10px'}}
          variant='contained'
        >Log In</Button></a></div>
    </div>

  </LoginStyles>
);

export default Login;
