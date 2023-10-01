import React, { useState, useEffect} from "react";
import "./DeviceDetailStyle.css";
import AudioClassification from "../../components/AudioClassification";
import CustomMap from "../../components/leaflet";

const DeviceDetail = ({ device, userId, handleBackClick }) => {
  let latitude = 0;
  let longitude = 0;
  let error = null;

  useEffect(() => {
    const theme = localStorage.getItem("theme");
  
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);
  

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
  const [activeButton, setActiveButton] = useState('info'); 
  
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
          <div className="infoSuperDiv">
            <div className="infoMainDiv">
            <div  className="nameDiv">
              {device.deviceName}
            </div>
            <div className="heighTypeDiv">
              <div className="heighDiv">
                <div className="typeLabel">Type: </div>
                <div className="typeValue"> {device.treeType}</div>
                </div>
              <div className="heighDiv">
                <div  className="heighLabel">Heigh:</div>
              <div className="heighValue">{device.treeHeigh}</div>
              </div>

            </div>
            <div className="locationDiv2">
              <div className="locationLabel">location</div>
              <div className="locationValue">{device.location}</div>
              </div>
            <div className="locationDiv2">
                <div className="detailsLabel" >More Details:</div>
                <div className="detailsValue" >{device.details}</div>
            </div>
            <div>
              <div>
                <AudioClassification userId={userId} deviceId={device._id} />
              </div>
            </div>
          </div>
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


