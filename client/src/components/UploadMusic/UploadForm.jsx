import React, {useState} from 'react';
import axios from 'axios';

const UploadForm = ({setFileSelected, upCloud}) => {

  
  return ( 
    <div>
      <input type='file' onChange={(e) => {
        // console.log(e.target.files[0])
        setFileSelected(e.target.files[0]);
      }}/>
      <button type='submit' onClick={() => upCloud()}>Upload</button>
    </div>
  );
};

export default UploadForm;