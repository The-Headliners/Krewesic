import React, {useState, useEffect, useRef, useContext} from 'react';
import Video from './Video.jsx';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import StreamChat from './StreamChat.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';



const StyledEvent = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .videoScreen {

  }
  .myVideoWrapper {
    height: 50px;
    width: 50px;
  }
  .peerVideoWrapper {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 450px;
  }
  .lowerWrapper {
    position: absolute;
    top: 250px;
    right: 20px;
  }
`;



const ConferenceCall = () => {
 

  const {socket} = useContext(GlobalContext);
  const {name} = useContext(GlobalContext);

  const myPeer = useRef(new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3002
    host: '/',
    path: '/peerjs',
    port: '3002'
    
      
  }));


  const [stream, setStream ] = useState({});
  //const [peerStream, setPeerStream] = useState({});
  //get userId from the context/  then the cookies later
  const [mySocketId, setMySocketId] = useState();

  const myPeerId = useRef();
  const [otherPeerId, setOtherPeerId] = useState('');

  const userVideo = useRef();
  const peerVideo = useRef();

  const [allPeers, setAllPeers] = useState([]);
  const [peers, setPeers] = useState('');
  const currentStream = useRef();
  const [peerName, setPeerName] = useState('');

  

  const showId = useRef(useParams().code).current;


  useEffect(async () => {

    myPeer.current.on('open', (id) => {
      console.info('open', id);
      myPeerId.current = id;
      joinShow(id);
    });

    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false}); //turn the audio back to true after figure out how to mute hte videos!!!!
    //console.log('navigator setting the stream');
   
    //setStream(stream);
    currentStream.current = stream;
    userVideo.current.srcObject = stream;

    socket.on('user-connected', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      console.info('u connected', data);
      setPeerName(data.name);
      connectToNewUser(data.latestUser, stream);
      setPeers(data.latestUser);
      socket.emit('peerconnected', {name: name, showId: showId, userId: myPeerId.current}); //this goes back, and signals other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      const notMe = data.allUsers.filter(uObj => uObj.peerId !== myPeerId.current);
      // console.log('notMe', notMe);
      setAllPeers(notMe);

    });

    socket.on('anotherPeerHere', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      //console.log('another peer data', data);
      setPeerName(data.name);
      connectToNewUser(data.latestUser, stream);
      setPeers(data);
      socket.emit('peerconnected', peers); //this is the step missing-- this needs to go back, and signal other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      const notMe = data.allUsers.filter(uObj => uObj.peerId !== myPeerId.current);
      //console.log('notMe', notMe);
      setAllPeers(notMe);
      
    });


    myPeer.current.on('call', call => {
      //console.log('call mypeer.current.on');
      call.answer(currentStream.current);
      //put this stream in the peerVideo and the peerStream
      call.on('stream', (peerStream) => {
        peerVideo.current.srcObject = peerStream;
        //setPeerStream(peerStream);

      });
     
    });
  
  

    const {data} = await axios.get(`/virtualEventUsers/${showId}`);
    //console.log('data from fetch', data);
    if (data) {
      const notMe = data.filter(uObj => uObj.peerId !== myPeerId.current);
      //console.log('notMe', notMe);
      setAllPeers(notMe);
    }
    

  }, []);


  const connectToNewUser = (userId, stream) => {
    // console.log('connectToNewUser', userId, currentStream.current);
    const call = myPeer.current.call(userId, currentStream.current);
    call.on('stream', userVideoStream => {
      //setPeerStream(userVideoStream);
    });

    
  };
  const joinShow = (x) => {
    socket.emit('joinShow', {showId: showId, userId: x, name: name }); 
  };

  useEffect(() => {
    //console.log('allPeers change', allPeers);
    allPeers.length && connectToNewUser(allPeers[allPeers.length - 1].peerId);
   
  
  }, [allPeers]);


 

 

  return (
    <StyledEvent>
      <div className='wrapper'>

      virtual 
        <div className='videoWrapper myVideoWrapper'>
          <video playsInline style={{width: '300px', height: '300px'}} muted ref={userVideo} autoPlay></video>
        </div>
        
        <div className='videoWrapper peerVideoWrapper'>
          <video playsInline muted style={{width: '400px', height: '400px', marginTop: '100px'}} ref={peerVideo}autoPlay></video>
        </div>
        
        
        <div className='lowerWrapper'>
          <div>talking with: {peerName}</div>
          <StreamChat showId={showId} socket={socket} />
        </div>
      </div>
    </StyledEvent>
  );
};

export default ConferenceCall;