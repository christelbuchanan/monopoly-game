import React, { useState, useEffect } from 'react';
import { DiceProps } from '../types';

const Dice: React.FC<DiceProps> = ({ values, isRolling, onRoll }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isRolling) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isRolling]);

  const renderDot = (position: string) => (
    <div className={`absolute w-2 h-2 bg-black rounded-full ${position}`}></div>
  );

  const renderDice = (value: number) => {
    const dots = [];
    
    if (value === 1 || value === 3 || value === 5) {
      dots.push(renderDot('top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2')); // center
    }
    
    if (value >= 2) {
      dots.push(renderDot('top-2 left-2')); // top-left
      dots.push(renderDot('bottom-2 right-2')); // bottom-right
    }
    
    if (value >= 4) {
      dots.push(renderDot('top-2 right-2')); // top-right
      dots.push(renderDot('bottom-2 left-2')); // bottom-left
    }
    
    if (value === 6) {
      dots.push(renderDot('top-1/2 left-2 -translate-y-1/2')); // middle-left
      dots.push(renderDot('top-1/2 right-2 -translate-y-1/2')); // middle-right
    }

    return (
      <div className={`relative w-16 h-16 bg-white rounded-lg shadow-lg border-2 border-gray-300 ${animating ? 'animate-spin' : ''}`}>
        {dots}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        {values.map((value, index) => (
          <div key={index} className="transform transition-all duration-300 hover:scale-110">
            {renderDice(value)}
          </div>
        ))}
      </div>
      <button
        onClick={onRoll}
        disabled={isRolling}
        className="px-6 py-2 bg-monopoly-red text-white font-nunito font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
};

export default Dice;
