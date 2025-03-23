import React from 'react';
import { PlayerCardProps } from '../types';
import PlayerProperties from './PlayerProperties';

const PlayerCard: React.FC<PlayerCardProps> = ({ 
  player, 
  isCurrentPlayer, 
  properties, 
  onPropertyClick 
}) => {
  return (
    <div 
      className={`
        relative p-4 rounded-lg shadow-md transition-all duration-300 
        ${isCurrentPlayer ? 'bg-monopoly-green text-white scale-105' : 'bg-white'} 
        border-2 ${isCurrentPlayer ? 'border-monopoly-yellow' : 'border-gray-200'}
      `}
    >
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-monopoly-red flex items-center justify-center font-nunito font-bold">
        {player.id + 1}
      </div>
      
      <h3 className={`font-nunito font-bold text-lg mb-2 ${isCurrentPlayer ? 'text-white' : 'text-monopoly-blue'}`}>
        {player.name}
      </h3>
      
      <div className="flex items-center mb-2">
        <div className={`w-4 h-4 rounded-full ${player.color} mr-2`}></div>
        <p className="font-nunito font-semibold">
          ${player.money.toLocaleString()}
        </p>
      </div>
      
      <div className="text-sm">
        <p className="font-nunito">
          <span className="font-semibold">Position:</span> {player.position}
        </p>
        <p className="font-nunito">
          <span className="font-semibold">Properties:</span> {player.properties.length}
        </p>
        {player.jailStatus.inJail && (
          <p className="font-nunito text-monopoly-red font-bold">
            In Jail ({player.jailStatus.turnsInJail}/3)
          </p>
        )}
      </div>
      
      {isCurrentPlayer && (
        <>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-monopoly-yellow rotate-45 animate-pulse"></div>
          <PlayerProperties 
            player={player} 
            properties={properties} 
            onPropertyClick={onPropertyClick}
          />
        </>
      )}
    </div>
  );
};

export default PlayerCard;
