import React from "react";
import "./HowToUse.css";
import greenLogo from "../../../assets/images/";


const HowToUse= ({handleBackClick}) => {

return(

    <div className="mainContainer">
        <p>1.First you have to Contact us to provide you with 
            the hardware responsible of collecting the needed data and 
            triggering the logging notification.</p>
            <img  src={greenLogo} alt="Green Guardian Logo" /> 
        <p>2.Hide the hardware in a place near to your target. </p>

        <p>3.Make sure you have a near WIFI network to enable the device connection (you can check the WIFI SSID(name) and signal strength from you mobile ).
Add new device and provide the needed information.</p>
        <button  className="button" onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default HowToUse;