import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import './AudioClassification.css';
import axios from 'axios'; 
import { useState } from "react";


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
      email: "hilal.bodon@gmail.com",
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
      "BROWSER_FFT", 
      undefined,
      checkpointURL,
      metadataURL
    );

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

              if (this.state.count >= 5) {
                const notificationData = {
                  device: '6509c07a0252b1c899f2af2b', 
                  user: '6509ae106682a65e6a41efd3',
                  message: 'chainSaw detected',    
                };
            
                axios.post('http://localhost:8080/api/notifications', notificationData)
                  .then(response => {
                    if (response.status === 201) {
                      console.log('Notification sent and stored.');
                    } else {
                      console.error('Failed to send notification.');
                    }
                  })
                  .catch(error => {
                    console.error('Error sending notification:', error);
                  });



                    this.sendEmail();
                    console.log('Sent notification to email');

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





  
// sendEmail = async () => {
//   const { email } = this.state;
//   const data = {
//     email,
//   };
//   const response = await axios.post(
//     "http://localhost:8080/api/sendemail",
//     data
//   );
//   console.log(response.data);
// };

sendEmail = async () => {
    const { email } = this.state;
    const data = {
      email,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sendemail",
        data
      );
  
      if (response.status === 200) {
        this.setState({ emailResponse: "Email sent successfully." });
      } else {
        this.setState({ emailResponse: "Failed to send email." });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      this.setState({ emailResponse: "Error sending email." });
    }
  };



  

  render() {
    const { handleBackClick } = this.props;
    const { recognizing, count, timerValue, emailResponse } = this.state;

    return (
      <div>
        <div id="label-container"></div>
        <div className="buttonsDiv">
        <button
          type="button"
          className={`recognize-button ${recognizing ? 'bounceStop' : 'start'}`}
          onClick={this.init}
        >
          {recognizing ? "Stop" : "Start"} Listening 
        </button>
        <button className="button" onClick={handleBackClick}>Back</button>
        <div className='countContainer'>
            <div>ChainSaw:{count}</div>
            <div>Timer: {timerValue} seconds</div>
        </div>
    </div>

    {emailResponse && (
        <div className="emailResponse">
          {emailResponse}
        </div>
      )}

      </div>
    );
  }
}

export default AudioRecognition;

