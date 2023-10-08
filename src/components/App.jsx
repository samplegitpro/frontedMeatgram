import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import LoadingOverlay from './Loading/LoadingOverlay';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds
  }, []);

  return (
    <div className={`app ${isLoading ? 'loading' : ''}`}>
      {isLoading && <LoadingOverlay />}
        <Header />
        <Footer />
    </div>
  );
}

export default App;
