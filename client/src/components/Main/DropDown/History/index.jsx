import React, { useEffect, useState } from "react";
import styles from "./HistoryStyle.module.css";
import axios from 'axios';
import { GiAxeInLog } from 'react-icons/gi';
import { GiSawedOffShotgun } from 'react-icons/gi';
import {GiChainsaw} from 'react-icons/gi';
import {RiDeleteBinFill} from 'react-icons/ri';

const History = ({ handleBackClick }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/notifications/6509ae106682a65e6a41efd3')
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <div className={styles.mainHistoryContainer}>
        <div className={styles.buttonsDiv}>
      <button className={styles.button} onClick={handleBackClick}>
        Back
      </button>
      <RiDeleteBinFill className={styles.icon}/>
      </div>


<div className={styles.notificationContainer}>
  {notifications.map((notification) => (
    <div key={notification._id} className={styles.notificationCard}>
        <div>
      {notification.message === 'chainSaw detected' && (
        <div className={styles.icon}>
          < GiChainsaw className={styles.icon} />
          <i className="chainsaw-icon"></i>
        </div>
      )}
      {notification.message === 'axe' && (
        <div className={styles.icon}>
          <GiAxeInLog className={styles.icon} />
          <i className="axe-icon"></i>
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
