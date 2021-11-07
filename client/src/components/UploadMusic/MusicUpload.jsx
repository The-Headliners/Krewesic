import React, {useEffect, useState} from 'react';
import { AudioCard, VideoCard } from 'material-ui-player';
import axios from 'axios';
import UploadForm from './UploadForm.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import AudioPlayer from './AudioPlayer.jsx';

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
  
  const musicPage = {
    // height: 'calc(100vh - 70px)',
    // display: 'flex',
    height: '100%',
    backgroundColor: '#150050'
  };

  const cardStyle = {
    // display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '150px',
    marginBottom: '10px',
    background: '#150050',
    padding: '1em',
    border: '0',
    boxShadow: '0 0 4px #CCC',
    marginRight: '20px'
    // backgroundColor: 'white'
  };
  const uploadStyle = {
    display: 'flex',
    flexDirection: 'column',
    // width: '23%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '10px',
    color: 'blue'
  };
  const musicBoxWrapper = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    padding: '10px',
    height: '100%',
    backgroundColor: '#150050'
  };
  return (
    <div className='upload-page' style={musicPage}>
      <div className="musicBoxWrapper" style={musicBoxWrapper} >
        <div style={uploadStyle}>Let's Upload Your Music Here! </div>
        <UploadForm showWidget={showWidget}/>

        {/* video list */}
        <div className='videoPlayer' style={cardStyle}>
          {
            musicUploads.slice(0).reverse().map(music => music.is_audio === false ? (<VideoPlayer music={music} /> ) : (<AudioPlayer music={music} />))
          }
        </div>
      </div>
    </div>
  );
};

export default MusicUpload;
