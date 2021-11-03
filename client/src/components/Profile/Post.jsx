import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Post = ({ posty, timey, index }) => {



  return (
    <Box
    >
      {index + 1}. {posty}
      <br/>
      <div>Posted: {timey}</div>
    </Box>

  );
};

export default Post;