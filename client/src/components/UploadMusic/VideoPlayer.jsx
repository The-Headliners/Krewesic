import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({music}) => {

  return (
    <div className="video-player">

      <ReactPlayer className='react-player' url={music.fileUrl} width="100%" height="100%" controls={true}/>
      
      {/* <div className="embed-responsive embed-responsive-16by9">
        <iframe className='embed-responsive-item' src={music.fileUrl} allowFullScreen> </iframe> */}
      {/* </div> */}

    </div>
  );
};

export default VideoPlayer;