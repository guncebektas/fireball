import React, { useState } from 'react';
import 'flowbite/dist/flowbite.min.css';
import { Button } from 'flowbite-react'; // Ensure Flowbite styles are imported

export const ProfileLocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state

  const getLocation = () => {
    setLoading(true); // Set loading to true when starting to get the location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false); // Set loading to false when location is fetched
        },
        (error) => {
          setError(error.message);
          setLoading(false); // Set loading to false on error
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false); // Set loading to false if geolocation is not supported
    }
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <Button
        type="button"
        onClick={getLocation}
        className="w-full flex justify-center items-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0115.9-2.4l1.5-1.3A10 10 0 0012 2a10 10 0 00-8.1 4.1L4 6.6A8 8 0 014 12z"
            />
          </svg>
        ) : (
          'Get location'
        )}
      </Button>

      {location.latitude && location.longitude ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Your Location:</h3>
          <p className="text-gray-700">Latitude: {location.latitude}</p>
          <p className="text-gray-700">Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">
          {error ? error : 'Click the button to get your location'}
        </p>
      )}
    </div>
  );
};
