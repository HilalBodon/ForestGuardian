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
      count:0,
      recognizing: false,
    };
  }




  async componentDidMount() {
    // Initialize TensorFlow.js
    await tf.ready();

    // Create the model recognizer
    const recognizer = await this.createModel();
    const classLabels = recognizer.wordLabels(); // get class labels
    this.setState({ recognizer, classLabels });
  }

  async createModel() {
    const URL = "https://teachablemachine.withgoogle.com/models/Xof36KxXS/";
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

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
    const { recognizer, classLabels, recognizing } = this.state;
    const labelContainer = document.getElementById("label-container");

    for (let i = 0; i < classLabels.length; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }

    if (recognizing) {
      // Stop recognition
      recognizer.stopListening();
    } else {
      // Start recognition
      recognizer.listen(result => {
        const scores = result.scores;
        let { count } = this.state;

        for (let i = 0; i < classLabels.length; i++) {
          const classPrediction = classLabels[i] + ": " + scores[i].toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;

          if (scores[i] > 0.98 && classLabels[i] === "chainSaw Sound") {
            count++;
            console.log(count);
          }
        }

        this.setState({ count });
      }, {
        includeSpectrogram: true,
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50
      });
    }


    this.setState({ recognizing: !recognizing });

  }

  render() {
    const { handleBackClick, recognizing } = this.props;

    return (
        <div>
          <div>Start ChainSaw Detection</div>
          <button type="button" onClick={this.init}>
            {recognizing ? "Stop" : "Start"} Listening
          </button>
          <div id="label-container"></div>
          <button className="button" onClick={handleBackClick}>Back</button>
        </div>
      );
  }
}

export default AudioRecognition;

