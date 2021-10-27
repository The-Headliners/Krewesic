import React, {useState, useEffect, useRef} from 'react';
import Video from './Video.jsx';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';



const StyledEvent = styled.div`
  .videoScreen {
    height: 200px;
    width: 200px;
  }
`;

const aws = false;
const deployedDNS = ''; //put deployed URI here
const host = aws === true
  ? deployedDNS
  : 'localhost';


//const socket = io.connect(`http://${host}:1337`);


const VirtualEvent = () => {

  const myPeer = new Peer();
  console.log('peer', myPeer);

  const [stream, setStream ] = useState();
  const [peerStream, setPeerStream] = useState();

  const userVideo = useRef();
  const peerVideo = useRef();
  const socket = useRef();


  //socket.current = io.connect('/')
  socket.current = io.connect(`http://${host}:1337`);

  const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream);
    call.on('stream', userVideoStream => {
      setPeerStream(userVideoStream);
    });

    //call on cloase remove vide

    
  };


  useEffect(async () => {

    //get the stream into the video
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    setStream(stream);
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }

    myPeer.on('call', call => {
      call.answer(stream);
      //put this stream in the peerVideo and the peerStream
    });



  }, []);

  const joinShow = () => {
    socket.current.emit('joinShow', {showId: 'thisisashowid', userId: 1}); //hardcoded for testing
   
  };




  socket.current.on('user-connected', (data) => {
    console.log('u connect', data);
    //when user is connected then connect to thenew user (connectToNewUser() function)
  });


  myPeer.on('open', (id) => {
    //socket.emit('test', 'test')
    // joinShow();
  });

  const testSocket = () => {
    socket.current.emit('test', {test: 'hello'});
  };

  return (
    <StyledEvent>
      <div>
        <button onClick={testSocket}>test</button>
        <button onClick={joinShow}>join show</button>
      virtual event
        <video playsInline muted ref={userVideo} autoPlay></video>
        <video playsInline muted ref={peerVideo} autoPlay></video>
      </div>
    </StyledEvent>
  );
};

export default VirtualEvent;
