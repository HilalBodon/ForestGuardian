import React from "react";
const HowToUse= ({handleBackClick}) => {

return(

    <div>
        <h2>How To Use</h2>
        <p>1. First you have to Contact us to provide you with 
            the hardware responsible of collecting the needed data and 
            triggering the logging notification.</p>

        <p>2.hide the hardware in a place near to your target. </p>
        <button onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default HowToUse;