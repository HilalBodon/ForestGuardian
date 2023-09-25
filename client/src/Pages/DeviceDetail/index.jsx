
import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification"; // Import the AudioClassification component

const DeviceDetail = ({ device, userId, handleBackClick }) => {
    return (
    <div className="device-detail-container">
      <button className="button" onClick={handleBackClick}>
        Back
      </button>
      <p>Device Name: {device.deviceName}</p>
      <p>Device ID: {device._id}</p>
      <p>user ID :{userId}</p>


      <AudioClassification userId={userId} deviceId={device._id} />
    </div>
  );
};

export default DeviceDetail;
