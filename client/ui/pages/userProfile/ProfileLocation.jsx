import React, {useState} from 'react';
import 'flowbite/dist/flowbite.min.css';
import {Button} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n"; // Ensure Flowbite styles are imported
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {H2} from "../../components/heading/Headings";

export const ProfileLocation = () => {
  const t = useTranslator();

  const [location, setLocation] = useState({latitude: null, longitude: null});
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
    <>
      <div className="flex items-center">
        <H2 text="Location"/>
      </div>

      <Button
        type="button"
        onClick={getLocation}
        className="w-full flex justify-center items-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin className="h-5 w-5 text-white mr-2"/>
        ) : (
          t('Get location')
        )}
      </Button>

      {location.latitude && location.longitude ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{t('Your location')}:</h3>
          <p className="text-gray-700">Latitude: {location.latitude}</p>
          <p className="text-gray-700">Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p className="mt-4 text-gray-500">
          {error ? error : t('Click the button to get your location')}.
        </p>
      )}
    </>
  );
};
