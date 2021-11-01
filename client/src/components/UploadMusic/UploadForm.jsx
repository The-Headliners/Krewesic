import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const UploadForm = ({showWidget}) => {

  const uploadStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '23%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '150px',
    marginBottom: '10px',
  };
  return (
    <div style={uploadStyle}>
      <Button color='primary' variant="contained" onClick={() => showWidget()}>Upload</Button>
    </div>
  );
};

export default UploadForm;