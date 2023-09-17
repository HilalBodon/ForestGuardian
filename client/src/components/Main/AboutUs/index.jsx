import React from "react";
const AboutUs = ({handleBackClick}) => {

return(

    <div>
        <h2>About Us</h2>
        <p>Forest Guardian Is a web app based on sound
             classification and deep learning using
              python and integrated with AWS for
               database and React js for the Front-End.</p>
        <p>The app Is responsible of sending notification 
            for any illegal-logging to a specific range and it’s specially 
            made for saving trees and animal in forest from intruders. </p>
        <button onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default AboutUs;