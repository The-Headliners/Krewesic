import React, {useState, useEffect, useContext, useRef} from 'react';
import {v4} from 'uuid';




const VideoChats = () => {

  const [allChats, setAllChats] = useState([]);

  const createVideoChat = () => {
    const uuid = v4();
    setAllChats(list => [...list, uuid]);
  };

  return (
    <div>
      <button onClick={createVideoChat}>create video chat </button>
      <div>
        {allChats.map((code, i )=> <button key={i}>{code}</button> )}
      </div>
      
    
    </div>
  );
};

export default VideoChats;
