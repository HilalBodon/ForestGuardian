import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CustomMap = ({ latitude, longitude }) => {
  return (
      <MapContainer
      center={[latitude, longitude]}  
        zoom={13} 
        style={{ height: "79vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Marker position={[latitude, longitude]}>
          <Popup>
            A sample marker on the map.
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  export default CustomMap;
  