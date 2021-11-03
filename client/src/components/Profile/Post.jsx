import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
    <div>
      <Box
        style={{ display: 'flex'}}
      >
        <Box
          style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}
        >
          {index + 1}. {posty}
        </Box>
        <br/>

      </Box>
      <Box
        style={{ display: 'flex', textAlign: 'center', justifyContent: 'center'}}
      >
        {time}</Box>
    </div>

  );
};

export default Post;