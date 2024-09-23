import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure this is correctly imported

const Map = ({ title, latitude = 41.0434, longitude = 29.0091, zoom = 14 }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error('Map container not found');
      return;
    }

    try {
      if (!mapRef.current) {
        // Initialize the map
        mapRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], zoom);

        // Add tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: '',
        }).addTo(mapRef.current);

        mapRef.current.attributionControl.remove();

        // Add marker
        const markerIcon = L.icon({
          iconUrl: `/online/brand/logo.svg`,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 0], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -5] // point from which the popup should open relative to the iconAnchor
        });

        L.marker([latitude, longitude], {
          icon: markerIcon
        }).addTo(mapRef.current)
          .bindPopup(title)
          .openPopup();
      }
    } catch (error) {
      console.error('Error initializing Leaflet map:', error);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude, zoom]);

  return <div ref={mapContainerRef} className="w-full h-[500px] z-0" id="map" />;
};

export default Map;
