import React from "react";
import "./AboutUsStyle.css"
const AboutUs = ({handleBackClick}) => {

return(

    <div className="mainContainer">
        <p>Forest Guardian Is a web app based on sound
             classification and deep learning using
              Python and integrated with Node.js and React</p>

              <br />
        <p>The app is responsible of sending notification 
            for illegal-logging to a specific range and it’s specially 
            made for saving trees and animals in the forest from intruders. </p>
            <br />

        <button className="button" onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default AboutUs;