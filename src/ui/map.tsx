"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import pinIcon from "../../public/images/icon-location.svg";
import { Icon } from "leaflet";

const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const blackIcon = new Icon({
    iconUrl: pinIcon,
    iconSize: [46, 56],
    iconAnchor: [12, 41],
  });
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[latitude, longitude]}
        // icon={blackIcon}
        draggable={false}
      />
    </MapContainer>
  );
};

export default Map;
