import React, {useState, useEffect, useRef, useContext} from 'react';
import Video from './Video.jsx';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import StreamChat from './StreamChat.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';



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
    top: 700px;
    left: 50px;
  }
`;



const VirtualEvent = () => {
  
  const {socket, id} = useContext(GlobalContext);
  const params = useParams();

  const myPeer = useRef(new Peer( undefined, { //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3002
  
    host: '/',
    port: '3002'
      
  }));

  //const code = useRef(useParams())
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
  //const peerStream = useRef();
  
  const [myVidDisplay, setMyVidDisplay] = useState('block');
  const [theirVidDisplay, setTheirVidDisplay] = useState('block');
  //const myVidDisplay = useRef('block');
  //const theirVidDisplay = useRef('block')
  

  const showId = useRef(useParams().code).current;

 


  useEffect(async () => {
    //console.log('id', id,);
    //console.log('params', params);
    myPeer.current.on('open', (id) => {
      //console.log('open', id);
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
      //console.log('u connected', data);
      connectToNewUser(data.latestUser, stream);
      setPeers(data.latestUser);
      socket.emit('peerconnected', {showId: showId, userId: myPeerId.current}); //this goes back, and signals other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      const notMe = data.allUsers.filter(uObj => uObj.peerId !== myPeerId.current);
      //console.log('notMe', notMe);
      setAllPeers(notMe);

    });

    socket.on('anotherPeerHere', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      //console.log('another peer data', data);
      connectToNewUser(data.latestUser, stream);
      setPeers(data);
      socket.emit('peerconnected', peers); //this is the step missing-- this needs to go back, and signal other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      const notMe = data.allUsers.filter(uObj => uObj.peerId !== myPeerId.current);
      //console.log('notMe', notMe);
      setAllPeers(notMe);
      setMyVidDisplay('hidden');
      myVidDisplay.current = 'hidden';

      
    });


    myPeer.current.on('call', call => {
      //console.log('call mypeer.current.on');
      call.answer(currentStream.current);
      //put this stream in the peerVideo and the peerStream
      call.on('stream', (peerStream) => {
        //console.log('peerVideo.current', peerVideo.current);
        //peerVideo.current.srcObject = peerStream;
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
    //console.log('connectToNewUser', userId, currentStream.current);
    const call = myPeer.current.call(userId, currentStream.current);
    call.on('stream', userVideoStream => {
      //setPeerStream(userVideoStream);
    });

    
  };
  const joinShow = (x) => {
    socket.emit('joinShow', {showId: showId, userId: x}); 
  };

  useEffect(() => {
    //console.log('allPeers change', allPeers);
    allPeers.length && connectToNewUser(allPeers[allPeers.length - 1].peerId);
   
  
  }, [allPeers]);


 

 

  return (
    <StyledEvent>
      <div className='wrapper'>

        <h1>{params.artistName}</h1>
        <div className='videoWrapper myVideoWrapper'>
          <video playsInline style={{width: '300px', height: '300px', display: myVidDisplay}} muted ref={userVideo} autoPlay></video>
        </div>
        <div className='videoWrapper peerVideoWrapper'>
          <video playsInline muted style={{width: '400px', height: '400px', marginTop: '100px', display: theirVidDisplay }} ref={peerVideo}autoPlay></video>
        </div>
        
        
        <div className='lowerWrapper'>
          <StreamChat showId={showId} socket={socket} />
        </div>
      </div>
    </StyledEvent>
  );
};

export default VirtualEvent;

//display: id == params.artistId ? 'block' : 'none' 