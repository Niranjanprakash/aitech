import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Replace 'G-XXXXXXXXXX' with your actual Google Analytics ID
    const GA_ID = 'G-XXXXXXXXXX';
    
    if (window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

export default GoogleAnalytics;
