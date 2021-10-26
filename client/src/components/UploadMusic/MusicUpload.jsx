import React, {useEffect, useState} from 'react';
import axios from 'axios';
import UploadForm from './UploadForm.jsx';

const MusicUpload = () => {

  const [currentUser, setUser] = useState('');
  //Create a state that will hold the files that is being uploaded
  const [fileSelected, setFileSelected] = useState('');
   
  const showWidget = () => {
    
    const widget = window.cloudinary.createUploadWidget({ 
      cloudName: 'dbylrb5vl',
      uploadPreset: 'udl2nhbw'}, 
    (error, result) => {
      if (!error && result && result.event === 'success') { 
        //console.log('Widget:', result); 
        const file = { fileUrl: result.info.url };
        axios.post(`/upload/musicUpload/${currentUser.id}`, file)
          .then(results => {
            //console.log('Upload File:', results);
          })
          .catch(err => {
            console.warn(err);
          });

      }
    });
    widget.open();
  };

  useEffect(() => {
    axios.get('/auth/cookie')
      .then(({data}) => {
        setUser(data[0]);
      });

  }, []);
  return ( 
    <div className='upload-page'>
      Hello Welcome!

      <UploadForm setFileSelected={setFileSelected} showWidget={showWidget}/>
    </div>
  );
};

export default MusicUpload;
