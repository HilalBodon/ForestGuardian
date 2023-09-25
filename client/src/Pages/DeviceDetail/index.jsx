
// import React from "react";
// import "./DeviceDetailStyle.css"; 

// const DeviceDetail = ({ device, handleBackClick }) => {
//   return (
//     <div className="device-detail-container">
//       <h2>Device Details</h2>
//       <p>Device Name: {device.deviceName}</p>
//       <p>Device ID: {device._id}</p>

//       <button className="button" onClick={handleBackClick}>Back</button>
//     </div>
//   );
// };

// export default DeviceDetail;
import React from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification"; // Import the AudioClassification component

const DeviceDetail = ({ device, userId, handleBackClick }) => {
    return (
    <div className="device-detail-container">
      <h2>Device Details</h2>
      <p>Device Name: {device.deviceName}</p>
      <p>Device ID: {device._id}</p>
      <p>user ID :{userId}</p>

      <button className="button" onClick={handleBackClick}>
        Back
      </button>

      <AudioClassification userId={userId} deviceId={device._id} />
    </div>
  );
};

export default DeviceDetail;
