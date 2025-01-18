import { useLocation } from 'react-router-dom';

export const useRouteUtility = () => {
  const location = useLocation();
  
  return {
    isHomepage: location.pathname === '/'
  };
};
