import React, { useEffect, useState } from "react";
import styles from "./HistoryStyle.module.css";
import axios from 'axios';
import { GiAxeInLog } from 'react-icons/gi';
import { GiSawedOffShotgun } from 'react-icons/gi';
import {GiChainsaw} from 'react-icons/gi';
import {RiDeleteBinFill} from 'react-icons/ri';

const History = ({ handleBackClick }) => {
  const [notifications, setNotifications] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/notifications/6509ae106682a65e6a41efd3')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const handleDeleteAll = async () => {
    const confirmed = window.confirm('Are you sure you want to delete all notifications?');

    if (confirmed) {
      try {
        await axios.delete('http://localhost:8080/api/notifications/6509ae106682a65e6a41efd3');
        setNotifications([]);
      } catch (error) {
        console.error('Error deleting notifications:', error);
      }
    }
    setShowConfirmation(false); 
  };

  return (
    <div className={styles.mainHistoryContainer}>
      <div className={styles.buttonsDiv}>
        <button className={styles.button} onClick={handleBackClick}>
          Back
        </button>
        <RiDeleteBinFill className={styles.icon} onClick={() => setShowConfirmation(true)} />
      </div>

      {showConfirmation && (
        <div className={styles.confirmationContainer}>
        <div>
            <p>Are you sure you want to delete all notifications?</p>
        </div>
        <div className={styles.YesNo} >
          <button className={`${styles.button} ${styles.yes}`} onClick={handleDeleteAll}>
            Yes
          </button>
          <button className={`${styles.button} ${styles.no}`} onClick={() => setShowConfirmation(false)}>
            No
          </button>
        </div>
        </div>
      )}

      <div className={styles.notificationContainer}>
        {notifications.map((notification) => (
          <div key={notification._id} className={styles.notificationCard}>
            <div>
              {notification.message === 'Chainsaw detected' && (
                <div className={styles.icon}>
                  <GiChainsaw className={styles.icon} />
                </div>
              )}
              {notification.message === 'Axe detected' && (
                <div className={styles.icon}>
                  <GiAxeInLog className={styles.icon} />
                </div>
              )}
            </div>
            <div className={styles.insideNotificationCard}>
              <div className={styles.deviceName}>{notification.device.deviceName}:</div>
              <div>{notification.message}</div>
              <div>At: {notification.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;


// import React, { useEffect, useState } from "react";
// import styles from "./HistoryStyle.module.css";
// import axios from 'axios';
// import { GiAxeInLog } from 'react-icons/gi';
// import { GiSawedOffShotgun } from 'react-icons/gi';
// import {GiChainsaw} from 'react-icons/gi';
// import {RiDeleteBinFill} from 'react-icons/ri';

// const History = ({ handleBackClick }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [showConfirmation, setShowConfirmation] = useState(false);


//   useEffect(() => {
//     axios.get('http://localhost:8080/api/notifications/6509ae106682a65e6a41efd3')
//       .then((response) => {
//         setNotifications(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching notifications:', error);
//       });
//   }, []);



//   const handleDeleteAll = async () => {
//     const confirmed = window.confirm('Are you sure you want to delete all notifications?');

//     if (confirmed) {
//       try {
//         await axios.delete('http://localhost:8080/api/notifications/6509ae106682a65e6a41efd3');
//         setNotifications([]); // Notifications deleted successfully, update the state
//       } catch (error) {
//         console.error('Error deleting notifications:', error);
//       }
//     }
//     setShowConfirmation(false); // Close the confirmation dialog
//   };

//   return (
//     <div className={styles.mainHistoryContainer}>
//         <div className={styles.buttonsDiv}>
//       <button className={styles.button} onClick={handleBackClick}>
//         Back
//       </button>
//       <RiDeleteBinFill className={styles.icon} onClick={() => setShowConfirmation(true)} />
//       </div>


// <div className={styles.notificationContainer}>
//   {notifications.map((notification) => (
//     <div key={notification._id} className={styles.notificationCard}>
//         <div>
//       {notification.message === 'chainSaw detected' && (
//         <div className={styles.icon}>
//           < GiChainsaw className={styles.icon} />
//           <i className="chainsaw-icon"></i>
//         </div>
//       )}
//       {notification.message === 'axe' && (
//         <div className={styles.icon}>
//           <GiAxeInLog className={styles.icon} />
//           <i className="axe-icon"></i>
//         </div>
//       )}
//       </div>
//       <div className={styles.insideNotificationCard}>
//       <div className={styles.deviceName}>{notification.device.deviceName}:</div>
//       <div>{notification.message}</div>
//       <div>At: {notification.createdAt}</div>
//     </div>
//     </div>
//     ))}
//     </div>
//     {showConfirmation && (
//         <div className={styles.confirmationContainer}>
//           <p>Are you sure you want to delete all notifications?</p>
//           <button onClick={handleDeleteAll}>Yes</button>
//           <button onClick={() => setShowConfirmation(false)}>No</button>
//         </div>
//       )}

//     </div>
//   );
// };

// export default History;
