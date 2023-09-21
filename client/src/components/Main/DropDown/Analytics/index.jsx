import React from "react";
import styles from "./AnalyticsStyle.module.css"
const Analytics= ({handleBackClick}) => {

return(

    <div>
        <h2>Analytics</h2>

        <button className={styles.button}onClick={handleBackClick}>Back</button>
    
    </div>
);
}
export default Analytics;