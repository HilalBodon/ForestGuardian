import React, { Component } from 'react';

class Spectrogram extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    // Initialize p5.js canvas in componentDidMount
    this.createCanvas();
  }

  createCanvas() {
    const sketch = (p) => {
      let mic;
      let fft;

      p.setup = () => {
        const canvas = p.createCanvas(400, 200);
        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT();
        fft.setInput(mic);
      };

      p.draw = () => {
        p.background(0);
        const spectrum = fft.analyze();
        p.noFill();
        p.beginShape();
        p.stroke(0, 255, 0); // Green color for the spectrogram

        for (let i = 0; i < spectrum.length; i++) {
          const x = p.map(i, 0, spectrum.length, 0, p.width);
          const h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
          p.vertex(x, p.height);
          p.vertex(x, h);
        }

        p.endShape();
      };
    };

    // Create a new p5 instance
    new window.p5(sketch, this.canvasRef.current);
  }

  render() {
    return <div ref={this.canvasRef}></div>;
  }
}

export default Spectrogram;
