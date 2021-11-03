import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const ArtistPosts = ({ posty, timey, index }) => {



  return (
    <Box
      style={{ display: 'flex', justifyContent: 'center', textAlign: 'center'}}
    >
      {posty}
      <br/>
    </Box>

  );
};

export default ArtistPosts;