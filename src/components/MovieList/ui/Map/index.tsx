// src/components/Map.tsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

const Map: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    // Устанавливаем иконку маркера, чтобы она отображалась правильно
    const DefaultIcon = L.Icon.Default as any;
    delete DefaultIcon.prototype._getIconUrl;
    DefaultIcon.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });

    // Получаем данные с Nominatim API
    axios
      .get(
        "https://nominatim.openstreetmap.org/search?q=restaurant&format=json&limit=10"
      ) // Пример запроса
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the locations!", error);
      });

    // Определяем текущее местоположение пользователя
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location", error);
        }
      );
    }
  }, []);

  // Компонент для обновления центра карты
  const MapCenterUpdater: React.FC<{ position: [number, number] | null }> = ({
    position,
  }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom()); // Обновляем центр карты и сохраняем текущий зум
      }
    }, [position, map]);

    return null;
  };

  return (
    <MapContainer
      center={userLocation || [51.505, -0.09]}
      zoom={13}
      style={{ height: "50vh", width: "50%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenterUpdater position={userLocation} />
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Вы здесь</Popup>
        </Marker>
      )}
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[parseFloat(location.lat), parseFloat(location.lon)]}
        >
          <Popup>{location.display_name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
