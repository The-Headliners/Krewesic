import React from 'react';
import Button from '@material-ui/core/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@material-ui/core/Typography';

const Login = () => (
  <header >
    <br/>
    <div >
      <Typography
        align='center'
        color='secondary'
        variant='h4'
      >KREWESIC</Typography>
      <br/>
      <p
        align='center'
      >LOGO HERE</p>
      <br/>
      <div
        align='center'
      ><a href='/auth/google'><Button
          startIcon={ <LoginIcon />}
          color='primary'
          variant='contained'
        >Log In</Button></a></div>
    </div>
  </header>
);

export default Login;