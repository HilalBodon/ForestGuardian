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
    // const URL = "https://teachablemachine.withgoogle.com/models/Xof36KxXS/";
    const URL ="https://teachablemachine.withgoogle.com/models/RO1FS-bVi/";
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
      recognizer.stopListening();
    } else {
      recognizer.listen(result => {
        const scores = result.scores;
        let { count } = this.state;

        for (let i = 0; i < classLabels.length; i++) {
          const classPrediction = classLabels[i] + ": " + scores[i].toFixed(2);
          labelContainer.childNodes[i].innerHTML = classPrediction;

          if (scores[i] > 0.98 && classLabels[i] === "Chain Saw") {
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
    const { handleBackClick } = this.props;
    const { recognizing } = this.state;

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
        <button className="button" onClick={handleBackClick}>Back</button>
      </div>
    );
  }
}

export default AudioRecognition;





{/* <div>Teachable Machine Audio Model - p5.js and ml5.js</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Global variable to store the classifier
let classifier;

// Label
let label = 'listening...';

// Teachable Machine model URL:
let soundModel = './my_model/';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}
</script> */}


