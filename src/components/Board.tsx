import React from 'react';
import PropertyTile from './PropertyTile';
import { Property, Player } from '../types';

interface BoardProps {
  properties: Property[];
  players: Player[];
  currentPlayer: number;
  onDrawCard: (cardType: 'chance' | 'community') => void;
  currentPlayerPosition: number;
  onSelectProperty: (propertyId: number) => void;
}

const Board: React.FC<BoardProps> = ({ 
  properties, 
  players, 
  currentPlayer,
  onDrawCard,
  currentPlayerPosition,
  onSelectProperty
}) => {
  // Group players by position
  const playersByPosition = players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {} as Record<number, Player[]>);

  // Get property by position
  const getPropertyByPosition = (position: number) => {
    return properties.find(p => p.position === position);
  };

  const handleTileClick = (property: Property) => {
    // Only show property details for the current player's position
    if (property.position === currentPlayerPosition) {
      onSelectProperty(property.id);
    }
    
    // Handle drawing cards when landing on Chance or Community Chest
    if (property.position === currentPlayerPosition) {
      if (property.type === 'chance') {
        onDrawCard('chance');
      } else if (property.type === 'community') {
        onDrawCard('community');
      }
    }
  };

  return (
    <div className="bg-monopoly-board border-4 border-black rounded-lg shadow-xl w-full max-w-[800px] mx-auto aspect-square">
      <div className="relative w-full h-full">
        {/* Bottom row */}
        <div className="absolute bottom-0 left-0 right-0 h-[16.67%] flex flex-row-reverse">
          <PropertyTile 
            property={getPropertyByPosition(0)!} 
            players={playersByPosition[0] || []}
            isCurrentPlayer={playersByPosition[0]?.some(p => p.id === currentPlayer) || false}
            orientation="corner"
            onClick={() => handleTileClick(getPropertyByPosition(0)!)}
          />
          
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(position => (
            <PropertyTile 
              key={position}
              property={getPropertyByPosition(position)!} 
              players={playersByPosition[position] || []}
              isCurrentPlayer={playersByPosition[position]?.some(p => p.id === currentPlayer) || false}
              orientation="bottom"
              onClick={() => handleTileClick(getPropertyByPosition(position)!)}
            />
          ))}
          
          <PropertyTile 
            property={getPropertyByPosition(10)!} 
            players={playersByPosition[10] || []}
            isCurrentPlayer={playersByPosition[10]?.some(p => p.id === currentPlayer) || false}
            orientation="corner"
            onClick={() => handleTileClick(getPropertyByPosition(10)!)}
          />
        </div>
        
        {/* Left column */}
        <div className="absolute top-[16.67%] left-0 bottom-[16.67%] w-[16.67%] flex flex-col-reverse">
          {[11, 12, 13, 14, 15, 16, 17, 18, 19].map(position => (
            <PropertyTile 
              key={position}
              property={getPropertyByPosition(position)!} 
              players={playersByPosition[position] || []}
              isCurrentPlayer={playersByPosition[position]?.some(p => p.id === currentPlayer) || false}
              orientation="left"
              onClick={() => handleTileClick(getPropertyByPosition(position)!)}
            />
          ))}
        </div>
        
        {/* Top row */}
        <div className="absolute top-0 left-0 right-0 h-[16.67%] flex">
          <PropertyTile 
            property={getPropertyByPosition(20)!} 
            players={playersByPosition[20] || []}
            isCurrentPlayer={playersByPosition[20]?.some(p => p.id === currentPlayer) || false}
            orientation="corner"
            onClick={() => handleTileClick(getPropertyByPosition(20)!)}
          />
          
          {[21, 22, 23, 24, 25, 26, 27, 28, 29].map(position => (
            <PropertyTile 
              key={position}
              property={getPropertyByPosition(position)!} 
              players={playersByPosition[position] || []}
              isCurrentPlayer={playersByPosition[position]?.some(p => p.id === currentPlayer) || false}
              orientation="top"
              onClick={() => handleTileClick(getPropertyByPosition(position)!)}
            />
          ))}
          
          <PropertyTile 
            property={getPropertyByPosition(30)!} 
            players={playersByPosition[30] || []}
            isCurrentPlayer={playersByPosition[30]?.some(p => p.id === currentPlayer) || false}
            orientation="corner"
            onClick={() => handleTileClick(getPropertyByPosition(30)!)}
          />
        </div>
        
        {/* Right column */}
        <div className="absolute top-[16.67%] right-0 bottom-[16.67%] w-[16.67%] flex flex-col">
          {[31, 32, 33, 34, 35, 36, 37, 38, 39].map(position => (
            <PropertyTile 
              key={position}
              property={getPropertyByPosition(position)!} 
              players={playersByPosition[position] || []}
              isCurrentPlayer={playersByPosition[position]?.some(p => p.id === currentPlayer) || false}
              orientation="right"
              onClick={() => handleTileClick(getPropertyByPosition(position)!)}
            />
          ))}
        </div>
        
        {/* Center area */}
        <div className="absolute top-[16.67%] left-[16.67%] right-[16.67%] bottom-[16.67%] flex items-center justify-center">
          <div className="transform -rotate-45">
            <h1 className="text-5xl font-nunito font-extrabold text-monopoly-red mb-2">MONOPOLY</h1>
            <h2 className="text-xl font-nunito font-bold text-center">Sydney Eastern Suburbs - Buchanan Edition</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
