import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import "./animations.css";
import "./effects.css";
import "./wizard.css";
import { createRipple } from "./utils/ripple";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Add ripple effect to all buttons
document.addEventListener('click', (e) => {
  const button = e.target.closest('.btn');
  if (button) {
    const rippleEvent = { ...e, currentTarget: button };
    createRipple(rippleEvent);
  }
});
