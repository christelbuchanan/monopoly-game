import React from 'react';
import { Property, Player } from '../types';

interface PropertyTileProps {
  property: Property;
  players: Player[];
  isCurrentPlayer: boolean;
  orientation: 'top' | 'right' | 'bottom' | 'left' | 'corner';
  onClick: () => void;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ 
  property, 
  players, 
  isCurrentPlayer,
  orientation,
  onClick
}) => {
  const getColorClass = () => {
    switch (property.color) {
      case 'monopoly-brown': return 'bg-[#955436]';
      case 'monopoly-light-blue': return 'bg-[#aae0fa]';
      case 'monopoly-purple': return 'bg-[#d93a96]';
      case 'monopoly-orange': return 'bg-[#f7941d]';
      case 'monopoly-red': return 'bg-[#ed1b24]';
      case 'monopoly-yellow': return 'bg-[#fef200]';
      case 'monopoly-green': return 'bg-[#1fb25a]';
      case 'monopoly-blue': return 'bg-[#0072bb]';
      case 'black': return 'bg-black';
      default: return 'bg-white';
    }
  };

  const renderCornerTile = () => {
    let content;
    
    if (property.name === "GO") {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="transform rotate-45 text-center">
            <div className="text-xl font-nunito font-bold text-monopoly-red">GO</div>
            <div className="text-xs font-nunito">Collect $200</div>
          </div>
        </div>
      );
    } else if (property.name === "Free Parking") {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <div className="text-lg font-nunito font-bold">FREE</div>
            <div className="text-lg font-nunito font-bold">PARKING</div>
            <div className="text-3xl mt-1">🚗</div>
          </div>
        </div>
      );
    } else if (property.name === "Go To Jail") {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <div className="text-lg font-nunito font-bold">GO TO</div>
            <div className="text-lg font-nunito font-bold">JAIL</div>
            <div className="text-3xl mt-1">👮</div>
          </div>
        </div>
      );
    } else if (property.name === "Jail / Just Visiting") {
      content = (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <div className="text-lg font-nunito font-bold">JAIL</div>
            <div className="text-xs font-nunito">Just Visiting</div>
            <div className="text-3xl mt-1">🔒</div>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="w-full h-full border border-black bg-monopoly-board flex items-center justify-center cursor-pointer"
        onClick={onClick}
      >
        {content}
        <div className="absolute bottom-1 right-1 flex flex-wrap justify-end max-w-[80%]">
          {players.map((player, index) => (
            <div 
              key={index} 
              className={`
                w-5 h-5 rounded-full flex items-center justify-center text-xs
                ${player.color} ${isCurrentPlayer && player.id === players[0].id ? 'ring-2 ring-yellow-400' : ''}
                m-0.5
              `}
            >
              {player.piece}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPropertyTile = () => {
    let content;
    
    if (property.type === 'property') {
      content = (
        <>
          <div className={`${getColorClass()} w-full h-5`}></div>
          <div className="p-1 text-center flex-grow flex flex-col justify-between">
            <div className="text-[8px] font-nunito font-semibold leading-tight">{property.name}</div>
            <div className="text-[8px] font-nunito">$<span>{property.price}</span></div>
          </div>
        </>
      );
    } else if (property.type === 'railroad') {
      content = (
        <div className="p-1 text-center h-full flex flex-col justify-between">
          <div className="text-[8px] font-nunito font-semibold leading-tight">{property.name}</div>
          <div className="text-xl">🚂</div>
          <div className="text-[8px] font-nunito">$<span>{property.price}</span></div>
        </div>
      );
    } else if (property.type === 'utility') {
      content = (
        <div className="p-1 text-center h-full flex flex-col justify-between">
          <div className="text-[8px] font-nunito font-semibold leading-tight">{property.name}</div>
          <div className="text-xl">{property.name.includes('Electric') ? '💡' : '💧'}</div>
          <div className="text-[8px] font-nunito">$<span>{property.price}</span></div>
        </div>
      );
    } else if (property.type === 'tax') {
      content = (
        <div className="p-1 text-center h-full flex flex-col justify-between">
          <div className="text-[8px] font-nunito font-semibold leading-tight">{property.name}</div>
          <div className="text-xl">💰</div>
          <div className="text-[8px] font-nunito">Pay $<span>{property.rent[0]}</span></div>
        </div>
      );
    } else if (property.type === 'chance') {
      content = (
        <div className="p-1 text-center h-full flex flex-col justify-between bg-orange-100">
          <div className="text-[8px] font-nunito font-semibold leading-tight">CHANCE</div>
          <div className="text-xl">❓</div>
          <div className="text-[8px] font-nunito">Draw a card</div>
        </div>
      );
    } else if (property.type === 'community') {
      content = (
        <div className="p-1 text-center h-full flex flex-col justify-between bg-blue-100">
          <div className="text-[8px] font-nunito font-semibold leading-tight">COMMUNITY CHEST</div>
          <div className="text-xl">📦</div>
          <div className="text-[8px] font-nunito">Draw a card</div>
        </div>
      );
    }
    
    return (
      <div 
        className={`
          w-full h-full border border-black bg-white flex 
          ${orientation === 'top' ? 'flex-col' : 
            orientation === 'right' ? 'flex-row-reverse' : 
            orientation === 'bottom' ? 'flex-col-reverse' : 
            'flex-row'}
          cursor-pointer
        `}
        onClick={onClick}
      >
        {content}
        <div className="absolute bottom-1 right-1 flex flex-wrap justify-end max-w-[80%]">
          {players.map((player, index) => (
            <div 
              key={index} 
              className={`
                w-4 h-4 rounded-full flex items-center justify-center text-xs
                ${player.color} ${isCurrentPlayer && player.id === players[0].id ? 'ring-2 ring-yellow-400' : ''}
                m-0.5
              `}
            >
              {player.piece}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return orientation === 'corner' ? renderCornerTile() : renderPropertyTile();
};

export default PropertyTile;
