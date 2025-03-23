import React from 'react';

interface GameControlsProps {
  onRollDice: () => void;
  onEndTurn: () => void;
  onBuyProperty: () => void;
  isRolling: boolean;
  canBuyProperty: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onRollDice, 
  onEndTurn, 
  onBuyProperty,
  isRolling,
  canBuyProperty
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-nunito font-bold mb-2">Game Controls</h3>
      <div className="flex flex-col space-y-2">
        <button
          onClick={onRollDice}
          disabled={isRolling}
          className={`py-2 px-4 rounded-lg font-nunito font-bold text-white ${
            isRolling ? 'bg-gray-400 cursor-not-allowed' : 'bg-monopoly-blue hover:bg-blue-700'
          }`}
        >
          Roll Dice
        </button>
        
        <button
          onClick={onBuyProperty}
          disabled={!canBuyProperty}
          className={`py-2 px-4 rounded-lg font-nunito font-bold text-white ${
            canBuyProperty ? 'bg-monopoly-green hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Buy Property
        </button>
        
        <button
          onClick={onEndTurn}
          className="py-2 px-4 rounded-lg font-nunito font-bold text-white bg-monopoly-red hover:bg-red-700"
        >
          End Turn
        </button>
      </div>
    </div>
  );
};

export default GameControls;
