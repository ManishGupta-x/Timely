import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {

  const navigate = useNavigate();
  const { setIsClicked, initialState } = useStateContext();
  function handleLogout() {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate("/");
    
  }
  return (
    <button
      type="button"
      onClick={() => {
        handleLogout();
        setIsClicked(initialState);

      }  }
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
