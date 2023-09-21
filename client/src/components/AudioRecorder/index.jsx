import React, { useState, useRef } from 'react';
import './AudioRecorder.css';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        audioChunks.current = [];
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };
  
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          
          const url = URL.createObjectURL(audioBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recorded-audio.wav';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        };
  
        mediaRecorder.current.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  };
  


  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
        const tracks = mediaRecorder.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };
  
  

  return (
    <div className="audio-recorder">
      <p className="recording-notification">
        {isRecording ? 'Recording is in progress...' : 'Click "Start Recording" to begin recording.'}
      </p>
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}

export default AudioRecorder;

