import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure this is correctly imported

const Map = ({ markers = [], zoom = 14 }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Guard clause if no map container or markers are provided
    if (!mapContainerRef.current || markers.length === 0) {
      console.error('Map container not found or no markers provided');
      return;
    }

    // Initialize the map if not already done
    if (!mapRef.current) {
      const { latitude, longitude } = markers[0]; // Use first marker as initial view

      mapRef.current = L.map(mapContainerRef.current).setView([latitude, longitude], zoom);

      // Add tile layer to the map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '',
      }).addTo(mapRef.current);

      mapRef.current.attributionControl.remove(); // Remove default attribution control
    }

    // Define a custom marker icon
    const markerIcon = L.icon({
      iconUrl: Meteor.settings.public.app.logo,
      iconSize: [48, 48], // Size of the icon
      iconAnchor: [24, 0], // Point that corresponds to marker's location
      popupAnchor: [0, -5], // Point from which the popup opens relative to iconAnchor
    });

    // Add markers to the map
    markers.forEach(({ title, latitude, longitude }) => {
      L.marker([latitude, longitude], { icon: markerIcon })
        .addTo(mapRef.current)
        .bindPopup(title)
        .openPopup();
    });

    // Cleanup function to remove map on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers, zoom]);

  return <div ref={mapContainerRef} className="w-full h-[500px] z-0" id="map" />;
};

export default Map;
