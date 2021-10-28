import React, {useState} from 'react';
import axios from 'axios';

const UploadForm = ({showWidget}) => {


  return (
    <div>
      <button type='submit' onClick={() => showWidget()}>Upload</button>
    </div>
  );
};

export default UploadForm;