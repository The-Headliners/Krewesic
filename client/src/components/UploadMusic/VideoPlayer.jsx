import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({music}) => {

  const videoPlayer = {
    fontSize: '16px',
    padding: '8px',
    borderBottom: '1px solid #CCC'
  };
  return (
    // video list entry media
    <div className="video-player" style={videoPlayer}>
    
      <div>

        <ReactPlayer className='react-player' url={music.fileUrl} width="100%" height="100%" controls={true}/>
      </div>
      
      <div className='detail-body'>
        <div className="video-title">
          Video
        </div>
      </div>
      {/* <div className="embed-responsive embed-responsive-16by9">
        <iframe className='embed-responsive-item' src={music.fileUrl} allowFullScreen> </iframe> */}
      {/* </div> */}

    </div>
  );
};

export default VideoPlayer;