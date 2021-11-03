import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Post = ({ posty, timey, index }) => {



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
    -Posted: {timey}</Box>
    </div>

  );
};

export default Post;