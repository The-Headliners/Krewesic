import React, {useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';

const RecordStyles = styled.div`
  background-color: green;
  .visualizer {
    height: 200px;
    width: 200px;
  }
`;



const AudioRecording = () => {

  const [stream, setStream] = useState({});
  const currentStream = useRef();
  const userAudio = useRef();
  const recordedAudio = useRef();
  const chunks = useRef([]);

  const [recording, setRecording] = useState(false);

  const mediaRecorder = useRef();

  const [audioUrl, setAudioUrl] = useState('');

  //audio context stuff
  // const [audioContext] = useState(new AudioContext())
  const audioContext = useRef(new AudioContext()).current; //can i do this? does teh video count as audioContext?
  const osc = useRef(audioContext.createOscillator()).current;
  const acDestination = useRef(audioContext.createMediaStreamDestination()).current;
  const analyserNode = useRef(new AnalyserNode(audioContext, {fftSize: 256})).current;

  //const canvasRef = React.createRef()
  const canvasRef = useRef(null);
  //const [canvas] = useState(canvasRef.current)

  const [recordingUrls, setRecordingUrls] = useState([])
 


  useEffect(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    setStream(stream);
    currentStream.current = stream;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyserNode);
    //source.connect(audioContext.destination)

    source.connect(acDestination);

    analyserNode.connect(acDestination);
    //console.log('analyser node', analyserNode)
    
    userAudio.current.srcObject = stream;
    //console.log('acDestination', acDestination)
    mediaRecorder.current = new MediaRecorder(acDestination.stream);

    mediaRecorder.current.ondataavailable = (e) => {
      //console.log('data available')
      chunks.current.push(e.data);

    };

   

    drawVisualizer();

  }, []);

  const drawVisualizer = () => {
    requestAnimationFrame(drawVisualizer);

    const width = 200;
    const height = 200;
    const barWidth = width / height * 10;
   

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    //console.log('canvas context', canvasContext)
      
    canvasContext.clearRect(0, 0, width, height);
  
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteFrequencyData(dataArray);
    //console.log(dataArray)
    dataArray.forEach((item, index) => {
      const y = item / 255 * height;
      const x = barWidth * index;
      // console.log('x', x, 'y', y)

      // canvasContext.rect(5,5,90,90);
      // canvasContext.fill();
      canvasContext.fillStyle = `hsl(${y/height * 250}, 100%, 50%)`;
      canvasContext.fillRect(x, height - y, barWidth, y);
      // canvasContext.fillRect = (20, 20, 10, 20)
    });

    //}
   
  };



  const saveMedia = () => {
    const blob = new Blob(chunks.current, {type: 'audio/mp3'});
    //console.log('chunks,', chunks.current)
    //console.log('blob', blob)
    const audioURL = window.URL.createObjectURL(blob);
    setAudioUrl(audioURL);
    setRecordingUrls(list => [...list, audioURL])
    
  };

  const startRecording = (e) => {
    chunks.current = []
    mediaRecorder.current.start(10);
   osc.start(0);
    setRecording(true);
  };

  const stopRecording = (e) => {
    mediaRecorder.current.stop();
    osc.stop(0);

    setRecording(false);
    saveMedia();
  };

  const play = () => {
    //connect recorded audio to analyser nde
    //console.log('recorded audio', recordedAudio.current);
    const playback = audioContext.createMediaElementSource(recordedAudio.current);
    playback.connect(audioContext.destination);
    playback.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    //console.log('analyser node', analyserNode);
    //playback.start(0);


  };
  



  return (
    <RecordStyles>
      <div>
      audio recording component

        <audio autoPlay playsInline muted ref={userAudio} ></audio>
        {recording ? <button onClick={stopRecording}>stop</button> : <button onClick={startRecording}>record</button>}
        {recordingUrls.map ((url, i) => <audio key={i} controls src={url}  playsInline ref={recordedAudio.current} ></audio>)}
        <button onClick={play}>play back</button>
      </div>
      <div className='visualizerDiv'>
        <canvas className='visualizer' ref={canvasRef} />
      </div>

    </RecordStyles>
  );
};

export default AudioRecording;

//<audio controls src={audioUrl} autoPlay playsInline ref={recordedAudio.current} ></audio>
