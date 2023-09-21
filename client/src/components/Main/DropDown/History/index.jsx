import React from "react";
import styles from "./HistoryStyle.module.css"
const History= ({handleBackClick}) => {

return(

    <div>
        <h2>history</h2>

        <button className={styles.button}onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default History;