// import React from "react";
// import styles from "./HistoryStyle.module.css"
// const History= ({handleBackClick}) => {

// return(

//     <div>
//         <h2>history</h2>

//         <button className={styles.button}onClick={handleBackClick}>Back</button>
    
//     </div>
// );
// }
// export default History;

import React, { useEffect, useState } from "react";
import styles from "./HistoryStyle.module.css";
import axios from 'axios';

const History = ({ handleBackClick }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/notifications')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div>
      <h2>History</h2>

      <button className={styles.button} onClick={handleBackClick}>
        Back
      </button>

      <div className={styles.notificationContainer}>
        {notifications.map((notification) => (
          <div key={notification._id} className={styles.notificationCard}>
            <p>Device: {notification.device.name}</p>
            <p>User: {notification.user.firstName} {notification.user.lastName}</p>
            <p>Message: {notification.message}</p>
            {/* Add more information as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
