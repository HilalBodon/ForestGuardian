import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  return (
    <div className="device-detail-container">
      <button className="button" onClick={handleBackClick}>
        Back
      </button>

        <div key={device._id}>
          <p>Device Name: {device.deviceName}</p>
          <p>Device ID: {device._id}</p>
          <p>User ID: {userId}</p>
          <p>Tree Type: {device.treeType}</p>
          <p>Tree Height: {device.treeHeight}</p>
          <p>Location: {device.location}</p>
          <p>Details: {device.details}</p>
          <p>Picture: {device.picture}</p>

          <AudioClassification userId={userId} deviceId={device._id} />
        </div>
    </div>
  );
};

export default DeviceDetail;
