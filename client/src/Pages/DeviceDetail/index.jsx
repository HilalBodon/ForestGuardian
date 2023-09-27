import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  let latitude = 0;
  let longitude = 0;
  let error = null;

  if (device.location && /^\d+\.\d+,\s*\d+\.\d+$/.test(device.location)) {
    const [latStr, lonStr] = device.location.split(',').map((str) => str.trim());
    
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (!isNaN(lat) && !isNaN(lon)) {
      latitude = lat;
      longitude = lon;
    } else {
      error = "Invalid latitude or longitude values in device.location";
    }
  } else {
    error = "Invalid device.location format";
  }

  return (
    <div className="device-detail-container">
      <button className="button addMargin" onClick={handleBackClick}>
        Back
      </button>

      <img src={device.picture} alt="Device Image" />
      <div key={device._id}>
        <p>
          {device.deviceName} is attached to a {device.treeType} tree, With
          Approximate Height of: {device.treeHeight} meters, in{" "}
          {device.location}
        </p>
        <p>More details: {device.details}</p>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <AudioClassification userId={userId} deviceId={device._id} />
            <CustomMap latitude={latitude} longitude={longitude} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDetail;

