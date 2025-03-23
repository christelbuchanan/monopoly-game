import React from 'react';
import { Property, Player } from '../types';

interface PropertyDetailProps {
  property: Property | null;
  currentPlayer: Player;
  onBuyProperty: () => void;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  currentPlayer, 
  onBuyProperty, 
  onClose 
}) => {
  if (!property) return null;

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

  const canBuyProperty = 
    property.owner === null && 
    ['property', 'railroad', 'utility'].includes(property.type) &&
    currentPlayer.money >= property.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Property card header */}
        {property.type === 'property' && (
          <div className={`${getColorClass()} h-16 rounded-t-lg flex items-center justify-center`}>
            <h2 className="text-white font-nunito font-bold text-xl">{property.name}</h2>
          </div>
        )}
        
        {/* Railroad or utility header */}
        {(property.type === 'railroad' || property.type === 'utility') && (
          <div className="bg-[#0072bb] h-16 rounded-t-lg flex items-center justify-center">
            <h2 className="text-white font-nunito font-bold text-xl">{property.name}</h2>
          </div>
        )}
        
        {/* Special space header */}
        {['chance', 'community', 'tax', 'corner'].includes(property.type) && (
          <div className="bg-[#ed1b24] h-16 rounded-t-lg flex items-center justify-center">
            <h2 className="text-white font-nunito font-bold text-xl">{property.name}</h2>
          </div>
        )}
        
        {/* Property details */}
        <div className="p-6">
          {/* Property type specific details */}
          {property.type === 'property' && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-nunito font-bold">Price:</span>
                <span className="font-nunito">${property.price}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-nunito font-bold mb-2">Rent:</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-nunito">Base Rent:</span>
                    <span className="font-nunito">${property.rent[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">With 1 House:</span>
                    <span className="font-nunito">${property.rent[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">With 2 Houses:</span>
                    <span className="font-nunito">${property.rent[2]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">With 3 Houses:</span>
                    <span className="font-nunito">${property.rent[3]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">With 4 Houses:</span>
                    <span className="font-nunito">${property.rent[4]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito font-bold">With Hotel:</span>
                    <span className="font-nunito font-bold">${property.rent[5]}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-nunito font-bold">Mortgage Value:</span>
                  <span className="font-nunito">${Math.floor(property.price / 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-nunito font-bold">House Cost:</span>
                  <span className="font-nunito">${property.housePrice}</span>
                </div>
              </div>
            </div>
          )}
          
          {property.type === 'railroad' && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-nunito font-bold">Price:</span>
                <span className="font-nunito">${property.price}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-nunito font-bold mb-2">Rent:</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="font-nunito">1 Railroad:</span>
                    <span className="font-nunito">${property.rent[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">2 Railroads:</span>
                    <span className="font-nunito">${property.rent[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito">3 Railroads:</span>
                    <span className="font-nunito">${property.rent[2]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-nunito font-bold">4 Railroads:</span>
                    <span className="font-nunito font-bold">${property.rent[3]}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-nunito font-bold">Mortgage Value:</span>
                  <span className="font-nunito">${Math.floor(property.price / 2)}</span>
                </div>
              </div>
            </div>
          )}
          
          {property.type === 'utility' && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-nunito font-bold">Price:</span>
                <span className="font-nunito">${property.price}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <h3 className="font-nunito font-bold mb-2">Rent:</h3>
                <p className="font-nunito">If one Utility is owned, rent is 4 times the amount shown on dice.</p>
                <p className="font-nunito">If both Utilities are owned, rent is 10 times the amount shown on dice.</p>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-nunito font-bold">Mortgage Value:</span>
                  <span className="font-nunito">${Math.floor(property.price / 2)}</span>
                </div>
              </div>
            </div>
          )}
          
          {property.type === 'tax' && (
            <div className="py-4">
              <p className="font-nunito text-center text-lg">Pay ${property.rent[0]} tax</p>
            </div>
          )}
          
          {property.type === 'chance' && (
            <div className="py-4">
              <p className="font-nunito text-center text-lg">Draw a Chance card</p>
            </div>
          )}
          
          {property.type === 'community' && (
            <div className="py-4">
              <p className="font-nunito text-center text-lg">Draw a Community Chest card</p>
            </div>
          )}
          
          {property.type === 'corner' && (
            <div className="py-4">
              <p className="font-nunito text-center text-lg">
                {property.name === "GO" && "Collect $200 as you pass GO"}
                {property.name === "Free Parking" && "Take a break, no rent due"}
                {property.name === "Go To Jail" && "Go directly to Jail"}
                {property.name === "Jail / Just Visiting" && "Just visiting"}
              </p>
            </div>
          )}
          
          {/* Ownership information */}
          {['property', 'railroad', 'utility'].includes(property.type) && (
            <div className="border-t border-gray-200 mt-3 pt-3">
              <h3 className="font-nunito font-bold mb-2">Ownership:</h3>
              {property.owner === null ? (
                <p className="font-nunito">This property is available for purchase.</p>
              ) : property.owner === currentPlayer.id ? (
                <p className="font-nunito">You own this property.</p>
              ) : (
                <p className="font-nunito">Owned by Player {property.owner + 1}.</p>
              )}
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-6 flex space-x-2">
            {canBuyProperty && (
              <button
                onClick={onBuyProperty}
                className="flex-1 py-2 bg-[#1fb25a] text-white font-nunito font-bold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
              >
                Buy for ${property.price}
              </button>
            )}
            
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-gray-300 text-gray-700 font-nunito font-bold rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
