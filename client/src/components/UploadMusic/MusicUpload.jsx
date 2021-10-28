import React, {useEffect, useState} from 'react';
import { AudioCard, VideoCard } from 'material-ui-player';
import axios from 'axios';
import UploadForm from './UploadForm.jsx';

const MusicUpload = () => {

  const [currentUser, setUser] = useState('');
  const [musicUploads, setMusic] = useState([]);
  //Create a state that will hold the files that is being uploaded
  const [fileSelected, setFileSelected] = useState('');
 
  const showWidget = () => {

    const widget = window.cloudinary.createUploadWidget({
      cloudName: 'dbylrb5vl',
      uploadPreset: 'udl2nhbw'},
    (error, result) => {
      if (!error && result && result.event === 'success') {
        const file = { fileUrl: result.info.url, is_audio: result.info.is_audio};

        setMusic(music => [...music, file]);

        axios.post(`/upload/musicUpload/${currentUser.id}`, file)
          .then(results => {
            
          })
          .catch(err => {
            console.warn(err);
          });

      }
    });
    widget.open();
  };

  useEffect( () => {

    const getMusic = async () => {
      try {
        const music = await axios.get(`/upload/musicUpload/${currentUser.id}`);
        setMusic(music.data[0].MusicUploads);
      } catch (err) {
        console.warn(err);
      }
    };
    getMusic();
  }, [currentUser]);

  
  

  useEffect(() => {
    axios.get('/auth/cookie')
      .then(({data}) => {
        setUser(data[0]);
      });
  }, []);
  
  return (
    <div className='upload-page'>
      Hello Welcome!

      <UploadForm showWidget={showWidget}/>

      <div className='videoPlayer' style={{backgroundColor: 'white'}}>
        {
          musicUploads.slice(0).reverse().map(music => music.is_audio === false ? (<div style={{color: 'black'}}>Video: <VideoCard src={music.fileUrl}/> </div>) : (<div style={{color: 'black'}}>Audio <AudioCard src={music.fileUrl}/> </div>))
        }
      </div>
    </div>
  );
};

export default MusicUpload;
