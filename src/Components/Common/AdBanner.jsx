// NewAdComponent.jsx
import React, { useEffect, useRef } from "react";

const AdBanner = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key' : '327f1ccb593152607f967d6848c09ac6',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      adRef.current.appendChild(script1);

      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "//www.highperformanceformat.com/327f1ccb593152607f967d6848c09ac6/invoke.js";
      adRef.current.appendChild(script2);

      return () => {
        adRef.current.removeChild(script1);
        adRef.current.removeChild(script2);
      };
    }
  }, []);

  return <div ref={adRef} style={{ width: '728px', height: '90px' }}></div>;
};

export default AdBanner;
