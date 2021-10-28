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

const aws = false;
const deployedDNS = ''; //put deployed URI here
const host = aws === true
  ? deployedDNS
  : 'localhost';


//const socket = io.connect(`http://${host}:1337`);
// const myPeer = new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3001
  
//   host: '/',
//   port: '3002'
  
// });

const VirtualEvent = () => {

  //const {id} = useContext(GlobalContext)

 

  //const socket = useRef(io.connect(`http://${host}:1337`)).current 
  const [socket] = useState(io.connect(`http://${host}:1337`));
  const [myPeer] = useState(new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3001
  
    host: '/',
    port: '3002'
    
  }));


  const [stream, setStream ] = useState({});
  const [peerStream, setPeerStream] = useState({});
  //get userId from the context/  then the cookies later
  const [mySocketId, setMySocketId] = useState();
  const [myPeerId, setMyPeerId] = useState();

  const userVideo = useRef();
  const peerVideo = useRef();

  const [peers, setPeers] = useState('');
  const currentStream = useRef();

  const [showId, setShowId] = useState('this_is_a_show_id');





  useEffect(() => {

    myPeer.on('open', (id) => {
      joinShow(id);
    });
  
    navigator.mediaDevices.getUserMedia({video: true, audio: false}) //turn the audio back to true after figure out how to mute hte videos!!!!
      .then(stream => {
        //console.log('streammm', stream)
        setStream(stream);
        currentStream.current = stream;
        userVideo.current.srcObject = stream;
      });




  }, []);

  const connectToNewUser = (userId, stream) => {
  
    const call = myPeer.call(userId, currentStream.current);
    
    //console.log('call', call);
    call.on('stream', userVideoStream => {
      setPeerStream(userVideoStream);
    });

    //call on cloase remove vide
    

    
  };
  const joinShow = (x) => {
    socket.emit('joinShow', {showId: showId, userId: x}); 
  };

  useEffect(() => {


    socket.on('user-connected', (data) => {
      // socket.current.on('user-connected', (data) => {
      //console.log('another user joined the room', data);
      //when user is connected then connect to thenew user (connectToNewUser() function)
      connectToNewUser(data, stream);
      setPeers(data);
      socket.emit('peerconnected', peers);
    });
   
    myPeer.on('call', call => {
      call.answer(currentStream.current);
      //put this stream in the peerVideo and the peerStream
      call.on('stream', (peerStream) => {
        peerVideo.current.srcObject = peerStream;
        //console.log('PEER STREAM', peerStream)
        setPeerStream(peerStream);
      });
      

    });
  }, [socket]);


 

  const testSocket = () => {
    socket.emit('test', {test: 'this is a test hello'});
  };

  return (
    <StyledEvent>
      <div>
        <button onClick={testSocket}>test</button>
        <button onClick={joinShow}>join show</button>
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
