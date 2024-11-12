import React, { useEffect } from "react";

const Banner = () => {
    useEffect(() => {
        const banners = Array.from({ length: 3 }, (_, i) => i); // Creates 3 banners

        banners.forEach((_, index) => {
            // Configuration script for each banner
            const configScript = document.createElement("script");
            configScript.type = "text/javascript";
            configScript.innerHTML = `
                atOptions = {
                    'key' : 'd4daf137bf1252630422a424435a228a',
                    'format' : 'iframe',
                    'height' : 60,
                    'width' : 468,
                    'params' : {}
                };
            `;

            // External script for each banner
            const externalScript = document.createElement("script");
            externalScript.type = "text/javascript";
            externalScript.src = "//www.highperformanceformat.com/d4daf137bf1252630422a424435a228a/invoke.js";
            externalScript.async = true;

            // Append the scripts to the banner container
            const bannerContainer = document.getElementById(`banner-${index}`);
            bannerContainer.appendChild(configScript);
            bannerContainer.appendChild(externalScript);
        });

        // Cleanup to remove scripts when component unmounts
        return () => {
            banners.forEach((_, index) => {
                const bannerContainer = document.getElementById(`banner-${index}`);
                if (bannerContainer) {
                    while (bannerContainer.firstChild) {
                        bannerContainer.removeChild(bannerContainer.firstChild);
                    }
                }
            });
        };
    }, []);

    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <div id="banner-0"></div>
            <div id="banner-1"></div>
            <div id="banner-2"></div>
        </div>
    );
};

export default Banner;
