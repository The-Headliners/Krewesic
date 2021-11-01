import React from 'react';
import Button from '@material-ui/core/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import logo from './images/KrewesicCropped.png'

const LoginStyles = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
  
    width: 200px;
    margin-bottom: 20px;

  }
`;

const Login = () => (
  <LoginStyles>
    <div className='wrapper' >
      <br/>
      <div >
      <img src={logo} className='logo'/>
        <br/>
     
        <p
          align='center'
        >find your Krewe and Music to march to</p>
        
        <br/>
        <div
          align='center'
        ><a href='/auth/google'><Button
            startIcon={ <LoginIcon />}
            color='primary'
            variant='contained'
          >Log In</Button></a></div>
      </div>
    </div>
  </LoginStyles>
);

export default Login;
