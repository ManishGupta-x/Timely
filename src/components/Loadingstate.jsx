import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
      <div className="border-8 border-gray-200 rounded-full h-24 w-24 animate-spin"></div>
    </div>
  );
};

export default Loading;
