import React, { useEffect, useState } from 'react';

interface GameMessageProps {
  message: string;
}

const GameMessage: React.FC<GameMessageProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  if (!message) return null;
  
  return (
    <div 
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 
        bg-white border-2 border-monopoly-red rounded-lg shadow-lg 
        p-4 max-w-md z-50 transition-opacity duration-500
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <p className="font-nunito font-semibold text-center">{message}</p>
    </div>
  );
};

export default GameMessage;
