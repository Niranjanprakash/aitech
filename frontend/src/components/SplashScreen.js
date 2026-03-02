import React, { useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onLaunch }) {
    const [exiting, setExiting] = useState(false);

    const handleLaunch = () => {
        setExiting(true);
        setTimeout(() => {
            onLaunch();
        }, 900);
    };

    return (
        <div className={`splash-screen ${exiting ? "splash-exit" : ""}`}>
            {/* Animated gradient background */}
            <div className="splash-gradient" />
            
            {/* Floating particles */}
            <div className="particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 10}s`
                    }} />
                ))}
            </div>

            {/* Animated circles */}
            <div className="circles">
                <div className="circle circle-1" />
                <div className="circle circle-2" />
                <div className="circle circle-3" />
            </div>

            {/* Top-left brand mark */}
            <div className="splash-brand">
                <span className="splash-brand-text">AITechPulze</span>
            </div>

            {/* Center welcome card */}
            <div className="splash-cta">
                <div className="splash-icon-wrapper">
                    <svg className="splash-icon" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="50" r="45" stroke="url(#gradient)" strokeWidth="2" />
                        <path d="M30 50 L45 65 L70 35" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
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