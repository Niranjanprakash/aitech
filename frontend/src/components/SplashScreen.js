import React, { useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onLaunch }) {
    const [exiting, setExiting] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);

    const handleLaunch = () => {
        setExiting(true);
        setTimeout(() => {
            onLaunch();
            const viewer = document.querySelector('spline-viewer');
            if (viewer) {
                viewer.remove();
            }
        }, 900);
    };

    return (
        <div className={`splash-screen ${exiting ? "splash-exit" : ""}`}>
            {/* Full-screen 3D Robot */}
            <div className="splash-3d">
                <spline-viewer 
                    url="https://prod.spline.design/EH5QKsP8tZa91Ev9/scene.splinecode"
                    loading="eager"
                    events-target="global"
                ></spline-viewer>
            </div>

            {/* Dark gradient overlay — bottom fade for text readability */}
            <div className="splash-overlay" />

            {/* Top-left brand mark */}
            <div className="splash-brand">
                <span className="splash-brand-text">AITechPulze</span>
            </div>

            {/* Bottom-right welcome card */}
            <div className="splash-cta">
                <p className="splash-welcome">Transform Ideas into Reality</p>
                <p className="splash-tagline">AI-Powered Solutions • Web Development • Fast Delivery</p>
                <button className="splash-launch-btn" onClick={handleLaunch}>
                    <span>Launch Experience</span>
                    <svg
                        className="splash-arrow"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SplashScreen;
