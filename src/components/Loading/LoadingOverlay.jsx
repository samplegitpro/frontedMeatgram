import React from 'react';
import './LoadingOverlay.css'; // Import your custom styles for the loading overlay

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Please wait...</p>
    </div>
  );
};

export default LoadingOverlay;
