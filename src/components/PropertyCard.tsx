import React from 'react';
import { PropertyCardProps } from '../types';

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onBuy, canBuy, currentPlayer }) => {
  const getColorClass = () => {
    switch (property.color) {
      case 'monopoly-brown': return 'bg-monopoly-brown';
      case 'monopoly-light-blue': return 'bg-monopoly-light-blue';
      case 'monopoly-purple': return 'bg-monopoly-purple';
      case 'monopoly-orange': return 'bg-monopoly-orange';
      case 'monopoly-red': return 'bg-monopoly-red';
      case 'monopoly-yellow': return 'bg-monopoly-yellow';
      case 'monopoly-green': return 'bg-monopoly-green';
      case 'monopoly-blue': return 'bg-monopoly-blue';
      case 'black': return 'bg-black';
      default: return 'bg-white';
    }
  };

  if (property.type === 'corner' || property.type === 'chance' || property.type === 'community' || property.type === 'tax') {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-200">
        <h3 className="font-nunito font-bold text-lg mb-2 text-monopoly-blue">{property.name}</h3>
        <p className="font-nunito text-sm">
          {property.type === 'tax' ? `Pay $${property.rent[0]}` : 'Draw a card'}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border-2 border-gray-200">
      <div className={`h-8 ${getColorClass()} -mx-4 -mt-4 mb-2 rounded-t-lg`}></div>
      <h3 className="font-nunito font-bold text-lg mb-2 text-monopoly-blue">{property.name}</h3>
      
      <div className="mb-2">
        <p className="font-nunito font-semibold">Price: ${property.price}</p>
        {property.type === 'property' && (
          <>
            <p className="font-nunito text-sm">Rent: ${property.rent[0]}</p>
            <p className="font-nunito text-sm">With 1 House: ${property.rent[1]}</p>
            <p className="font-nunito text-sm">With 2 Houses: ${property.rent[2]}</p>
            <p className="font-nunito text-sm">With 3 Houses: ${property.rent[3]}</p>
            <p className="font-nunito text-sm">With 4 Houses: ${property.rent[4]}</p>
            <p className="font-nunito text-sm">With Hotel: ${property.rent[5]}</p>
          </>
        )}
        
        {property.type === 'railroad' && (
          <>
            <p className="font-nunito text-sm">Rent: ${property.rent[0]}</p>
            <p className="font-nunito text-sm">If you own 2 Railroads: ${property.rent[1]}</p>
            <p className="font-nunito text-sm">If you own 3 Railroads: ${property.rent[2]}</p>
            <p className="font-nunito text-sm">If you own 4 Railroads: ${property.rent[3]}</p>
          </>
        )}
        
        {property.type === 'utility' && (
          <>
            <p className="font-nunito text-sm">If one Utility is owned, rent is 4 times amount shown on dice.</p>
            <p className="font-nunito text-sm">If both Utilities are owned, rent is 10 times amount shown on dice.</p>
          </>
        )}
      </div>
      
      {property.owner === null ? (
        <button
          onClick={onBuy}
          disabled={!canBuy || currentPlayer.money < property.price}
          className={`
            w-full py-2 font-nunito font-bold rounded-lg shadow-md transition-colors duration-300
            ${canBuy && currentPlayer.money >= property.price 
              ? 'bg-monopoly-green text-white hover:bg-green-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          Buy for ${property.price}
        </button>
      ) : (
        <div className="text-center p-2 bg-gray-100 rounded-lg">
          <p className="font-nunito font-semibold">
            {property.owner === currentPlayer.id 
              ? 'You own this property' 
              : `Owned by Player ${property.owner + 1}`}
          </p>
          {property.mortgaged && (
            <p className="font-nunito text-sm text-monopoly-red">Mortgaged</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
