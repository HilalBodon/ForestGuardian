// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const CustomMap = () => {
//     return (
//       <MapContainer
//         center={[51.505, -0.09]} // Initial coordinates (latitude, longitude)
//         zoom={13} // Initial zoom level
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A sample marker on the map.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     );
//   };
  


//   import React, { useRef, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// function LeafletMap(props) {
//   const { selectedLocation } = props;
//   const defaultCenter = [34.43352, 35.84415]; 
//   const mapRef = useRef();

//   useEffect(() => {
//     if (selectedLocation && mapRef.current) {
//       mapRef.current.flyTo(selectedLocation, 10, {
//         duration: 3,
//       });
//     }
//   }, [selectedLocation]);
//   return (
//     <MapContainer ref={mapRef} center={selectedLocation || defaultCenter} zoom={10} style={{ height: "400px" ,width:"500px"}}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
//         <Marker position={selectedLocation}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }

// export default LeafletMap;
