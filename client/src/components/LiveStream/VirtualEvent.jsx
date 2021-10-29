import React, {useState, useEffect, useRef, useContext} from 'react';
import Video from './Video.jsx';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import StreamChat from './StreamChat.jsx';



const StyledEvent = styled.div`
  .videoScreen {
    height: 100px;
    width: 100px;
  }
`;



const VirtualEvent = () => {
  
  const {socket} = useContext(GlobalContext);

  const myPeer = useRef(new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3002
  
    host: '/',
    port: '3002'
      
  }));


  const [stream, setStream ] = useState({});
  const [peerStream, setPeerStream] = useState({});
  //get userId from the context/  then the cookies later
  const [mySocketId, setMySocketId] = useState();
  //const [myPeerId, setMyPeerId] = useState();
  const myPeerId = useRef();
  const [otherPeerId, setOtherPeerId] = useState('');

  const userVideo = useRef();
  const peerVideo = useRef();

  const [peers, setPeers] = useState('');
  const currentStream = useRef();

  const [showId, setShowId] = useState('this_is_a_show_id');


  useEffect(() => {

    myPeer.current.on('open', (id) => {
      myPeerId.current = id;
      joinShow(id);
    });
  
    navigator.mediaDevices.getUserMedia({video: true, audio: false}) //turn the audio back to true after figure out how to mute hte videos!!!!
      .then(stream => {
        setStream(stream);
        currentStream.current = stream;
        userVideo.current.srcObject = stream;
      });

  }, []);

  const connectToNewUser = (userId, stream) => {
  
    const call = myPeer.current.call(userId, currentStream.current);
    call.on('stream', userVideoStream => {
      setPeerStream(userVideoStream);
    });

    
  };
  const joinShow = (x) => {
    socket.emit('joinShow', {showId: showId, userId: x}); 
  };

  useEffect(() => {

    socket.on('user-connected', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      connectToNewUser(data, stream);
      setPeers(data);
      socket.emit('peerconnected', {showId: showId, userId: myPeerId.current}); //this goes back, and signals other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty

    });

    socket.on('anotherPeerHere', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      connectToNewUser(data, stream);
      setPeers(data);
      socket.emit('peerconnected', peers); //this is the step missing-- this needs to go back, and signal other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      
    });
   
    myPeer.current.on('call', call => {
      call.answer(currentStream.current);
      //put this stream in the peerVideo and the peerStream
      call.on('stream', (peerStream) => {
        peerVideo.current.srcObject = peerStream;
        setPeerStream(peerStream);

      });
     
    });
  }, [socket]);


 

 

  return (
    <StyledEvent>
      <div>

      virtual event
        <video playsInline muted ref={userVideo} autoPlay></video>
        <video playsInline muted ref={peerVideo} autoPlay></video>
        <div>
          <StreamChat showId={showId} socket={socket} />
        </div>
      </div>
    </StyledEvent>
  );
};

export default VirtualEvent;
