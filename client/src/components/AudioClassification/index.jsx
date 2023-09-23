import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import './AudioClassification.css';

class AudioRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classLabels: [],
      recognizer: null,
      count: 0,
      recognizing: false,
      timer: null,
      timerValue: 0,
      alertShown: false,
    };
  }

  async componentDidMount() {
    await tf.ready();

    const recognizer = await this.createModel();
    const classLabels = recognizer.wordLabels(); 
    this.setState({ recognizer, classLabels });
  }

  async createModel() {
    const URL = "https://teachablemachine.withgoogle.com/models/RO1FS-bVi/";
    const checkpointURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    const recognizer = speechCommands.create(
      "BROWSER_FFT", // fourier transform type, not useful to change
      undefined, // speech commands vocabulary feature, not useful for your models
      checkpointURL,
      metadataURL
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
  }

  init = async () => {
    const { recognizer, classLabels, recognizing, timer } = this.state;
    const labelContainer = document.getElementById("label-container");
  
    for (let i = 0; i < classLabels.length; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  
    if (recognizing) {
      recognizer.stopListening();
      clearInterval(timer);
      this.setState({ timerValue: 0 });
    } else {
      recognizer.listen(result => {
        const scores = result.scores;
  
        for (let i = 0; i < classLabels.length; i++) {
          const classPrediction = classLabels[i] + ": " + scores[i].toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;
  
          if (scores[i] > 0.90 && classLabels[i] === "Chain Saw") {
            this.setState(prevState => ({
              count: prevState.count + 1,
              timerValue: 0,
            }), () => {
              if (this.state.count >= 10) {
                clearInterval(timer);
                alert("Count reached 10!");
                this.setState({ count: 0 });
              }
            });
          }
        }
      }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
      });
  
      if (!timer) {
        const newTimer = setInterval(() => {
          if (this.state.timerValue >= 60) {
            clearInterval(newTimer);
            this.setState({ timerValue: 0 });
          } else {
            this.setState(prevState => ({ timerValue: prevState.timerValue + 1 }));
          }
        }, 1000);
  
        this.setState({ timer: newTimer });
      }
    }
  
    this.setState({ recognizing: !recognizing });
  }
  

  render() {
    const { handleBackClick } = this.props;
    const { recognizing, count, timerValue } = this.state;
  
    return (
      <div>
        <div>Teachable Machine Audio Model</div>
        <button
          type="button"
          className={`recognize-button ${recognizing ? 'stop' : 'start'}`}
          onClick={this.init}
        >
          {recognizing ? "Stop" : "Start"} Recognition
        </button>
        <div id="label-container"></div>
        <div>Count: {count}</div>
        <div>Timer: {timerValue} seconds</div>
        <button className="button" onClick={handleBackClick}>Back</button>
      </div>
    );
  }
}

export default AudioRecognition;

