import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';

import styled, {ThemeProvider} from 'styled-components';

const ProfilePostStyles = styled.div`

  @media screen and (max-width: 480px) {

  }
  .hoverino:hover {
    background-color: #D8BFD8;
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
        className='hoverino'
      >
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
          style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '10px' }}
        >
          {time}</Box>
      </Box>
    </ProfilePostStyles>

  );
};

export default Post;