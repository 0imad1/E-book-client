// AdComponent.jsx
import React, { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = "//pl24963471.profitablecpmrate.com/d27f71e548c86594e2a321744a947736/invoke.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="container-d27f71e548c86594e2a321744a947736"></div>;
};

export default AdComponent;
