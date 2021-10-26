import React, {useState} from 'react';
import axios from 'axios';

const UploadForm = ({setFileSelected, showWidget}) => {

  
  return ( 
    <div>
      <input type='file' onChange={(e) => {
        console.log(e.target.files[0]);
        setFileSelected(e.target.files[0]);
      }}/>
      <button type='submit' onClick={() => showWidget()}>Upload</button>
    </div>
  );
};

export default UploadForm;