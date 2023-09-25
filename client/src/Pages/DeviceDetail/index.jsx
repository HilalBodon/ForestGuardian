
import React from "react";
import "./DeviceDetailStyle.css"; 

const DeviceDetail = ({ device, handleBackClick }) => {
  return (
    <div className="device-detail-container">
      <h2>Device Details</h2>
      <p>Device Name: {device.deviceName}</p>
      <p>Device ID: {device._id}</p>

      <button className="button" onClick={handleBackClick}>Back</button>
    </div>
  );
};

export default DeviceDetail;
