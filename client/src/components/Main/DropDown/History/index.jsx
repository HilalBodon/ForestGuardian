import React from "react";
const History= ({handleBackClick}) => {

return(

    <div>
        <h2>history</h2>

        <button onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default History;