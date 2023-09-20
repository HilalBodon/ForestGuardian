import React from "react";
import "./HowToUse.css";

const HowToUse= ({handleBackClick}) => {

return(

    <div className="mainContainer">
        <p>1. First you have to Contact us to provide you with 
            the hardware responsible of collecting the needed data and 
            triggering the logging notification.</p>

        <p>2.hide the hardware in a place near to your target. </p>
        <button  className="button" onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default HowToUse;