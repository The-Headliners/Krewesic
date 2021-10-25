import React, {useState} from 'react';
import axios from 'axios';
import UploadForm from './UploadForm.jsx';

const MusicUpload = () => {

  //Create a state that will hold the files that is being uploaded
  const [fileSelected, setFileSelected] = useState(''); 


  const upCloud = () => {
    //create an instance object of a Form data which will hold all the data coming from the input form
    const formData = new FormData();
    

    //Here, we will construct the formData using the append method
    formData.append('file', fileSelected);
    formData.append('upload_preset', 'udl2nhbw');
   

    //Send a post request to cloudinary's api.
    axios.post('https://api.cloudinary.com/v1_1/dbylrb5vl/image/upload', formData)
      .then((result) => {

        console.log('CLOUDINARY!:', result);
      });
      
  };

  return ( 
    <div className='upload-page'>
      Hello Welcome!

      <UploadForm setFileSelected={setFileSelected} upCloud={upCloud}/>
    </div>
  );
};

export default MusicUpload;
