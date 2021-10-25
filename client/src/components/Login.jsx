import React from 'react';
import Button from '@material-ui/core/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const LoginStyles = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .logo {
    height: 200px;
    width: 200px; 
    margin-bottom: 20px;

  }
`;

const Login = () => (
  <LoginStyles>
    <div className='wrapper' >
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
        >find your Krewe and Music to march to</p>
        <img src='https://export-download.canva.com/G8Nys/DAEtvsG8Nys/3/0/0001-10686997051.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHKNGJLC2J7OGJ6Q%2F20211024%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211024T080316Z&X-Amz-Expires=30299&X-Amz-Signature=0d1aed5b963affb1cb29ba2f29fd81f0fdbea7f630aa9d28ba495ffdddb36e2b&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27Cream%2520and%2520Green%2520Circles%2520Art%2520%26%2520Design%2520Logo.png&response-expires=Sun%2C%2024%20Oct%202021%2016%3A28%3A15%20GMT' className='logo'/>
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
