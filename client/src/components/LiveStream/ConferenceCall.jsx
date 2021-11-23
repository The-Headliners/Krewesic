import React, {useState, useEffect, useRef, useContext} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
//import Peer from 'peerjs';
import GlobalContext from '../Contexts/GlobalContext.jsx';
import StreamChat from './StreamChat.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Peer from 'peerjs';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import peerObject from './peerObject.js'



const StyledEvent = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .videoScreen {

  }
  .talkWith {
    padding: 10px;
  }
  .myVideoWrapper {
    display: flex;
    justify-content: flex-end
  }
  .peerVideoWrapper {
  
  }
  .lowerWrapper {
   display: flex;
   flex-direction: column;
   margin-top: 100px;
   margin-left: 70px;
  }
  .videoWrapper {
    display: flex;
    flex-direction: column;
  }
  .tryAgainButton {
    background-color: ${props => props.theme.colorMed};
    width: 600px;
    margin-left: 40px;
  }
 
`;

const ConferenceCall = () => {
 

  const {socket} = useContext(GlobalContext);
  const {name} = useContext(GlobalContext);

  const peerObj = useRef(peerObject.deployed ? peerObject.deployedPeerObj : peerObject.localPeerObj);

  const myPeer = useRef(new Peer( undefined, peerObj.current //{ //remember: npm i -g peer   \n peerjs --port 3002   running peer port on 3002
    // host: '/',
    // path: '/',
    // port: '3002'

    //for deployment below
    // host: 'krewesic.com',
    // path: '/',
    // secure: true,       

  //}
  ));

  const [history] = useState(useHistory());

  const [stream, setStream ] = useState({});
  const [mySocketId, setMySocketId] = useState();

  const myPeerId = useRef();
  const [otherPeerId, setOtherPeerId] = useState('');

  const userVideo = useRef();
  const peerVideo = useRef();

  const peerRef = useRef('');
  const allPeersRef = useRef([]);

  const [allPeers, setAllPeers] = useState([]);
  const [peers, setPeers] = useState('');
  const currentStream = useRef();
  const [peerName, setPeerName] = useState('');
  const peerNameRef = useRef('');

  

  const showId = useRef(useParams().code).current;


  useEffect(async () => {

    myPeer.current.on('open', (id) => {
      //console.info('open', id);
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
      //console.info('u connected', data);
      setPeerName(data.name);
      //console.log('dta.name', data.name);
      peerNameRef.current = data.name;
      connectToNewUser(data.latestUser, stream);
      setPeers(data.latestUser);
      peerRef.current = data.latestUser;
      socket.emit('peerconnected', {name: name, showId: showId, userId: myPeerId.current}); //this goes back, and signals other user that this person joined the room.  to not throw infinite loop: should probably account for to only add that peer to the state if the state is empty
      const notMe = data.allUsers.filter(uObj => uObj.peerId !== myPeerId.current);
      // console.log('notMe', notMe);
      setAllPeers(notMe);

    });

    socket.on('anotherPeerHere', (data) => {
      //when user is connected then connect to thenew user (connectToNewUser() function)
      //console.log('another peer data', data);
      setPeerName(data.name);
      //console.log('dta.name', data.name);
      peerNameRef.current = data.name;
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

    //this will run when leave the page
    const stopWebcam = () => {
      currentStream.current.getTracks().forEach(track => {
        track.stop();
      });
      //disconnect peerjs
      myPeer.current.disconnect();
      //leave the socket.io room
      
    };

    const unlisten = history.listen(stopWebcam);

    return unlisten;
    

  }, []);


  const connectToNewUser = (userId, stream) => {
    //console.log('connectToNewUser', userId, currentStream.current);
    const call = myPeer.current.call(userId, currentStream.current);
    call.on('stream', userVideoStream => {
      //setPeerStream(userVideoStream);
    });

    
  };
  const joinShow = (x) => {
    socket.emit('joinShow', {showId: showId, userId: x, name: name }); 
  };

  const take2 = () => {
    //console.log('js', myPeerId.current);
    joinShow(myPeerId.current);
  };

  useEffect(() => {
    //console.log('allPeers change', allPeers);
    allPeers.length && connectToNewUser(allPeers[allPeers.length - 1].peerId);
  }, [allPeers]);


 

 

  return (
    <StyledEvent>
      <div className='wrapper'>

        <div className='videoWrapper peerVideoWrapper'>
          <video playsInline muted style={{width: '600px', marginTop: '85px', marginLeft: '40px', position: 'relative'}} ref={peerVideo} autoPlay></video>
          <video playsInline style={{width: '200px', height: '100px', marginTop: '35px', position: 'absolute', left: '40px', top: '300px', zIndex: 4, }} muted ref={userVideo} autoPlay></video>
          <Button className='tryAgainButton' onClick={take2}>Reload Video</Button>
        </div>
       
        <div className='lowerWrapper'>
      
          <h2 className='talkingWith'>Talking With: {peerName}</h2>
          <StreamChat showId={showId} socket={socket} />

          <div className='videoWrapper myVideoWrapper'>
         
          </div>
       
         
        </div>
      </div>
    </StyledEvent>
  );
};

export default ConferenceCall;