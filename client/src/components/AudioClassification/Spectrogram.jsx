// import React, { Component } from 'react';
// import p5 from 'p5';

// class Spectrogram extends Component {
//   constructor(props) {
//     super(props);
//     this.canvasRef = React.createRef();
//     this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     this.micStream = null; 
//   }

//   componentDidMount() {
//     this.p5 = new p5(this.sketch, this.canvasRef.current);
//   }

//   initMicrophone = async () => {
//     let analyser;
//     let spectrogram = [];
    
//     try {
//       this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       analyser = this.audioContext.createAnalyser();
//       const source = this.audioContext.createMediaStreamSource(this.micStream);
//       source.connect(analyser);
//       analyser.fftSize = 256;
//       spectrogram = new Uint8Array(analyser.frequencyBinCount);
//       analyser.connect(this.audioContext.destination);
//     } catch (error) {
//       console.error('Error accessing microphone:', error);
//     }

//     this.p5.setup = () => {
//       this.p5.createCanvas(400, 200);
//     };

//     this.p5.draw = () => {
//       this.p5.background(0);
//       analyser.getByteFrequencyData(spectrogram);

//       for (let x = 0; x < spectrogram.length; x++) {
//         let y = this.p5.map(spectrogram[x], 0, 255, 0, this.p5.height);
//         this.p5.stroke(255);
//         this.p5.line(x, this.p5.height, x, this.p5.height - y);
//       }
//     };
//   }

//   componentWillUnmount() {
//     if (this.micStream) {
//       this.micStream.getTracks().forEach((track) => track.stop());
//     }
//   }

//   render() {
//     return <div ref={this.canvasRef}></div>;
//   }
// }

// export default Spectrogram;
