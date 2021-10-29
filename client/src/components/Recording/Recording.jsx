import React, {useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';

const RecordStyles = styled.div`
  background-color: green;
`;



const AudioRecording = () => {

  const [stream, setStream] = useState({});
  const currentStream = useRef();
  const userVideo = useRef();
  const recordedVideo = useRef();
  const chunks = useRef([]);

  const [recording, setRecording] = useState(false);

  const mediaRecorder = useRef();

  const [videoUrl, setVideoUrl] = useState('');


  useEffect(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    setStream(stream);
    currentStream.current = stream;
    
    userVideo.current.srcObject = stream;
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

  }, []);



  const saveMedia = () => {
    const blob = new Blob(chunks.current, {type: 'video/mp4'});
    const videoURL = window.URL.createObjectURL(blob);
    setVideoUrl(videoURL);
    
  };

  const startRecording = (e) => {
    mediaRecorder.current.start(10);
    setRecording(true);
  };

  const stopRecording = (e) => {
    mediaRecorder.current.stop();
    setRecording(false);
    saveMedia();
  };

  



  return (
    <RecordStyles>
      <div>
      audio recording component
        <video autoPlay playsInline muted ref={userVideo} ></video>
        {recording ? <button onClick={stopRecording}>stop</button> : <button onClick={startRecording}>record</button>}
        <video controls src={videoUrl} autoPlay playsInline ref={recordedVideo} ></video>
      </div>
    </RecordStyles>
  );
};

export default AudioRecording;
