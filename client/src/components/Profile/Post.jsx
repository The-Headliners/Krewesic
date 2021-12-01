import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';

import styled, {ThemeProvider} from 'styled-components';

const ProfilePostStyles = styled.div`

  @media screen and (max-width: 480px) {

  }
  .hoverino:hover {
    color: 	white;
    background-color: black;
    font-weight: bold;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    .wrapper {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      overflow: hidden;
    }

    .box {
      padding-top: 5px;
      padding-bottom: 5px;
      animation: grow-and-shrink 4000ms;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    @keyframes grow-and-shrink {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.25);
      }
      100% {
        transform: scale(1);
      }
    }

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
        className='hoverino wrapper'
      >
        <Box
          className='box'
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
      </Box>
    </ProfilePostStyles>

  );
};

export default Post;