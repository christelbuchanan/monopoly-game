import React, { useState } from 'react';
import { MapPin, DollarSign, Users } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (playerCount: number, playerNames: string[], playerPieces: string[]) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [playerPieces, setPlayerPieces] = useState(['🚗', '🚢', '🎩', '🐕']);
  
  const availablePieces = ['🚗', '🚢', '🎩', '🐕', '🐈', '🚁', '🚂', '🏍️', '🛵', '🚀'];
  
  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };
  
  const handlePieceChange = (index: number, piece: string) => {
    const newPieces = [...playerPieces];
    newPieces[index] = piece;
    setPlayerPieces(newPieces);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(
      playerCount, 
      playerNames.slice(0, playerCount),
      playerPieces.slice(0, playerCount)
    );
  };
  
  return (
    <div className="flex-grow bg-gradient-to-br from-monopoly-green to-monopoly-blue flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-nunito font-extrabold text-monopoly-red mb-2 animate-pulse-slow">SYDNEY</h1>
          <h2 className="text-2xl font-nunito font-bold text-monopoly-blue">MONOPOLY</h2>
          <div className="flex items-center justify-center mt-2">
            <MapPin className="text-monopoly-red mr-2" />
            <p className="font-nunito font-semibold">Sydney Eastern Suburbs - Buchanan Edition</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-nunito font-semibold mb-2 flex items-center">
              <Users className="mr-2" />
              Number of Players
            </label>
            <div className="flex justify-between">
              {[2, 3, 4].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPlayerCount(num)}
                  className={`
                    flex-1 py-2 mx-1 font-nunito font-bold rounded-lg transition-colors duration-300
                    ${playerCount === num 
                      ? 'bg-monopoly-blue text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                  `}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="block font-nunito font-semibold mb-2 flex items-center">
              <DollarSign className="mr-2" />
              Player Setup
            </label>
            {Array.from({ length: playerCount }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${
                  index === 0 ? 'bg-red-500' : 
                  index === 1 ? 'bg-blue-500' : 
                  index === 2 ? 'bg-green-500' : 
                  'bg-yellow-500'
                }`}></div>
                <input
                  type="text"
                  value={playerNames[index]}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg font-nunito focus:outline-none focus:ring-2 focus:ring-monopoly-blue"
                  maxLength={15}
                  required
                />
                <select
                  value={playerPieces[index]}
                  onChange={(e) => handlePieceChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg font-nunito focus:outline-none focus:ring-2 focus:ring-monopoly-blue"
                >
                  {availablePieces.map(piece => (
                    <option key={piece} value={piece}>{piece}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-monopoly-red text-white font-nunito font-bold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
          >
            Start Game
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="font-nunito text-sm text-gray-600">
            Roll the dice, buy properties, and become the real estate mogul of Sydney's Eastern Suburbs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
