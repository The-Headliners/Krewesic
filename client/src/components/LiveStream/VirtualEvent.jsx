import React, {useState, useEffect, useRef, useContext} from 'react';
import Video from './Video.jsx';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';
import GlobalContext from '../Contexts/GlobalContext.jsx';



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

  //const {id} = useContext(GlobalContext)
  const myPeer = new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3001   running peer port on 3001
  
      host: '/',
      port: '3001'
    
  });
  console.log('peer', myPeer);

  
  const [stream, setStream ] = useState();
  const [peerStream, setPeerStream] = useState();
  //get userId from the context/  then the cookies later
  const [mySocketId, setMySocketId] = useState();
  const [myPeerId, setMyPeerId] = useState()

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


    socket.current.on('user-connected', (data) => {
      console.log('u connect', data);
      //when user is connected then connect to thenew user (connectToNewUser() function)
     // connectToNewUser(data, stream);
    });

    myPeer.on('call', call => {
      call.answer(stream);
      //put this stream in the peerVideo and the peerStream
    });



  }, []);

  const joinShow = (x) => {
    socket.current.emit('joinShow', {showId: 'thisisashowid', userId: x}); //hardcoded for testing
   
  };



  myPeer.on('open', (id) => {
    console.log('open', id);
    joinShow(id);
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
