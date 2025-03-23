import React from 'react';
import { Player } from '../types';
import { Trophy, RefreshCw } from 'lucide-react';

interface GameOverScreenProps {
  winner: Player | null;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner, onRestart }) => {
  return (
    <div className="flex-grow bg-gradient-to-br from-monopoly-green to-monopoly-blue flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-nunito font-extrabold text-monopoly-red mb-2">GAME OVER</h1>
          <h2 className="text-2xl font-nunito font-bold text-monopoly-blue">SYDNEY MONOPOLY</h2>
          <div className="flex items-center justify-center mt-2">
            <p className="font-nunito font-semibold">Sydney Eastern Suburbs - Buchanan Edition</p>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Trophy className="text-yellow-500 w-16 h-16" />
            </div>
          </div>
          
          <h3 className="text-2xl font-nunito font-bold mb-2">
            {winner ? `${winner.name} Wins!` : 'Game Over!'}
          </h3>
          
          {winner && (
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="font-nunito text-lg mb-2">
                <span className="font-bold">{winner.name}</span> is the real estate mogul of Sydney's Eastern Suburbs!
              </p>
              <p className="font-nunito">
                Final Balance: <span className="font-bold text-green-600">${winner.money}</span>
              </p>
              <p className="font-nunito">
                Properties Owned: <span className="font-bold">{winner.properties.length}</span>
              </p>
            </div>
          )}
          
          <p className="font-nunito text-gray-600">
            Thank you for playing Sydney Monopoly!
          </p>
        </div>
        
        <button
          onClick={onRestart}
          className="flex items-center justify-center w-full py-3 bg-monopoly-blue text-white font-nunito font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          <RefreshCw className="mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
