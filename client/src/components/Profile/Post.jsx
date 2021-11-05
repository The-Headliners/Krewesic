import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import styled, {ThemeProvider} from 'styled-components';

const ProfilePostStyles = styled.div`

  @media screen and (max-width: 480px) {

  }
  .posty:hover {
    background-color: #9932CC;
  }
  .timey:hover {
    background-color: #8B008B;
  }
`;

const Post = ({ posty, timey, index }) => {

  const [ time, setTime ] = useState(null);

  const myTime = () => {
    if (timey.slice(0, 2) > 12) {
      let hey = timey.slice(0, 2);
      hey -= 12;
      const usTime = hey + ':' + timey.slice(3);
      setTime(usTime + ' ' + 'PM');
    } else {
      setTime(timey + ' ' + 'AM');
    }
  };

  useEffect(() => {
    myTime();
  });

  return (
    <ProfilePostStyles>
      <Box
        className='posty'
        style={{ justifyContent: 'center'}}
      >
        <Box
          style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}
        >
          {index + 1}. {posty}
        </Box>
      </Box>
      <Box
        className='timey'
        style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}
      >
        {time}</Box>
      <br/>
    </ProfilePostStyles>

  );
};

export default Post;