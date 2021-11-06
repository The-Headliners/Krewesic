import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

const AudioPlayer = ({music}) => {

  return (
    <div className="audio-player">

      <ReactAudioPlayer
        src={music.fileUrl}
        autoPlay
        width="100%" 
        height="100%"
        controls
      />
      
      {/* <div className="embed-responsive embed-responsive-16by9">
        <iframe className='embed-responsive-item' src={music.fileUrl} allowFullScreen> </iframe> */}
      {/* </div> */}

    </div>
  );
};

export default AudioPlayer;