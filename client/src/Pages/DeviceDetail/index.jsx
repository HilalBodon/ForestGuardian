import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  return (
    <div className="device-detail-container">
      <button className="button addMargin" onClick={handleBackClick}>
        Back
      </button>

            <img src={device.picture} alt="Device Image" />        <div key={device._id}>
          <p>{device.deviceName} is attached to a {device.treeType} 
          tree, With Approximate Height of: {device.treeHeight} meters, in {device.location}</p>
          <p>More details: {device.details}</p>

          <AudioClassification userId={userId} deviceId={device._id} />
          <CustomMap />


        </div>
    </div>
  );
};

export default DeviceDetail;
