import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
    const [latitude, longitude] = device.location.split(',').map(parseFloat);

  return (
    <div className="device-detail-container">
      <button className="button addMargin" onClick={handleBackClick}>
        Back
      </button>

            <img src={device.picture} alt="Device Image" />        <div key={device._id}>
          <p>{device.deviceName} is attached to a {device.treeType} 
          tree, With Approximate Height of: {device.treeHeight} meters, in {device.location}</p>
          <p>More details: {device.details}</p>
          <p>{device.location}</p>

          <AudioClassification userId={userId} deviceId={device._id} />
          <CustomMap latitude={latitude} longitude={longitude} />


        </div>
    </div>
  );
};

export default DeviceDetail;
