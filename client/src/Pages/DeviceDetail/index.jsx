import React, { useState } from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  let latitude = 0;
  let longitude = 0;
  let error = null;

  if (device.location && /^\d+\.\d+,\s*\d+\.\d+$/.test(device.location)) {
    const [latStr, lonStr] = device.location.split(",").map((str) => str.trim());

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
  
  const [mapVisible, setMapVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [activeButton, setActiveButton] = useState('info'); // 'info' is the default active button
  
  const toggleMap = () => {
    setMapVisible(true);
    setInfoVisible(false);
  };

  const toggleInfo = () => {
    setInfoVisible(true);
    setMapVisible(false);
  };

  const toggleButton = (buttonName) => {
    setActiveButton(buttonName);

    if (buttonName === 'info') {
      toggleInfo();
    } else if (buttonName === 'map') {
      toggleMap();
    }
  };


  return (
    <div className="device-detail-container">
      
      <div className="locationDiv">
        <button
          className={activeButton === 'info' ? 'active-button' : ''}
          onClick={() => toggleButton('info')}
        >
          Info
        </button>
        <button
          className={activeButton === 'map' ? 'active-button' : ''}
          onClick={() => toggleButton('map')}
        >
          Map
        </button>
      </div>

      {mapVisible && <CustomMap latitude={latitude} longitude={longitude} />}
     
      {infoVisible && (
        
        <div key={device._id}>
          <div className="imgDiv">
          <img  src={device.picture} alt="Device Image" />
          </div>

          <div className="infoMainDiv">
            <div  className="nameDiv">
              <p>{device.deviceName}</p>
            </div>
            <div className="heightDiv">
              <div>{device.treeType}</div>
              <div>{device.treeHeight}</div>
            </div>
            <div>Location</div>
            <div>More Details:</div>
            <div>            <div>
              <AudioClassification userId={userId} deviceId={device._id} />
            </div></div>
          </div>
          {/* <p>
            {device.deviceName} is attached to a {device.treeType} tree, With
            Approximate Height of: {device.treeHeight} meters
          </p> */}
          {/* <p>More details: {device.details}</p> */}
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div>
              {/* <AudioClassification userId={userId} deviceId={device._id} /> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;




// import React, { useState } from "react";
// import "./DeviceDetailStyle.css";
// import { MdLocationOn, MdLocationOff } from "react-icons/md"; 
// import AudioClassification from "../../components/AudioClassification";
// import CustomMap from "../../components/leaflet";

// const DeviceDetail = ({ device, userId, handleBackClick }) => {
//   let latitude = 0;
//   let longitude = 0;
//   let error = null;

//   if (device.location && /^\d+\.\d+,\s*\d+\.\d+$/.test(device.location)) {
//     const [latStr, lonStr] = device.location.split(',').map((str) => str.trim());
    
//     const lat = parseFloat(latStr);
//     const lon = parseFloat(lonStr);

//     if (!isNaN(lat) && !isNaN(lon)) {
//       latitude = lat;
//       longitude = lon;
//     } else {
//       error = "Invalid latitude or longitude values in device.location";
//     }
//   } else {
//     error = "Invalid device.location format";
//   }

//   const [mapVisible, setMapVisible] = useState(false);

//   const toggleMap = () => {
//     setMapVisible(!mapVisible);
//   };

//   return (
//     <div className="device-detail-container">
//         <div className="locationDiv">

//       <div onClick={toggleMap} style={{ cursor: "pointer" }}>
//         {mapVisible ? <MdLocationOff className="icon" /> : <MdLocationOn className="icon"/>}{" "}
//       </div>
//       </div>
//       {mapVisible ? (
//         <CustomMap latitude={latitude} longitude={longitude} />
//       ) : (
//         <div className="imgDiv">
//         <img src={device.picture} alt="Device Image" />
//         </div>
//       )}
//       <div key={device._id}>
//         <p>
//           {device.deviceName} is attached to a {device.treeType} tree, With
//           Approximate Height of: {device.treeHeight} meters 
//         </p>
//         <p>More details: {device.details}</p>
//         {error ? (
//           <p className="error-message">{error}</p>
//         ) : (
//           <div>
//             <AudioClassification userId={userId} deviceId={device._id} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeviceDetail;
