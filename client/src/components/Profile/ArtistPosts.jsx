import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import styled, {ThemeProvider} from 'styled-components';

const PostStyles = styled.div`

  @media screen and (max-width: 480px) {

  }
  .hoverino:hover {
    color: 	black;
    background-color: #BA55D3;
  }

`;

const ArtistPosts = ({ posty, timey, index }) => {

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
    <PostStyles>
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
          style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', marginBottom: '10px'}}
        >
          {time}</Box>
      </Box>
    </PostStyles>

  );
};

export default ArtistPosts;

