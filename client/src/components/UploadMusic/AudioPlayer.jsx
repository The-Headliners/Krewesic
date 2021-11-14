import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({music}) => {
  const audioPlayer = {
    fontSize: '16px',
    padding: '8px',
    borderBottom: '1px solid #CCC'
  };
  return (
    <div className="audio-player" style={audioPlayer}>

      <ReactAudioPlayer
        src={music.fileUrl}
        width="100%" 
        height="100%"
        controls
      />
      
      <div className='detail-body'>
        <div className="video-title">
          Audio
        </div>
      </div>
      {/* <div className="embed-responsive embed-responsive-16by9">
        <iframe className='embed-responsive-item' src={music.fileUrl} allowFullScreen> </iframe> */}
      {/* </div> */}

    </div>
  );
};

export default AudioPlayer;