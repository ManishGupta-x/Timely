import React, { useState, useEffect } from 'react';

const LoadingComponent = ({ message = 'Assembling your time table...' }) => {
  const [opacity, setOpacity] = useState(0);
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isBlinking) {
        setOpacity((prevOpacity) =>
          prevOpacity < 1 ? prevOpacity + 0.05 : 1
        );
      } else {
        setOpacity((prevOpacity) =>
          prevOpacity > 0 ? prevOpacity - 0.05 : 0
        );
      }
      setIsBlinking((prevBlinking) => !prevBlinking);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container flex items-center justify-start">
      <span
        className={`text-black text-xl font-bold animate-opacity-100 transition-opacity duration-1500 ease-in-out ${
          opacity === 0 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {message}
      </span>
      <div className="ml-4 animate-spin h-8 w-8 border-b-2 border-black rounded-full"></div>
    </div>
  );
};

export default LoadingComponent;
