import { GoogleMap } from "@react-google-maps/api";

function MyMap() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 23.23423424,
    lng: 33.242342423,
  };

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    >
      {/* Add map markers or other components here */}
    </GoogleMap>
  );
}
