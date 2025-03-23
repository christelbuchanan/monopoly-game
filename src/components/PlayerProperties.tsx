import React from 'react';
import { Player, Property, Card } from '../types';

interface PlayerPropertiesProps {
  player: Player;
  properties: Property[];
  onPropertyClick?: (propertyId: number) => void;
}

const PlayerProperties: React.FC<PlayerPropertiesProps> = ({ 
  player, 
  properties,
  onPropertyClick 
}) => {
  // Get all properties owned by the player
  const ownedProperties = properties.filter(property => 
    property.owner === player.id
  );

  // Group properties by color group
  const groupedProperties = ownedProperties.reduce((groups, property) => {
    const group = property.color;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(property);
    return groups;
  }, {} as Record<string, Property[]>);

  return (
    <div className="mt-2 p-2 bg-white rounded-lg shadow-md">
      <h4 className="font-nunito font-bold text-sm mb-2 text-monopoly-blue">
        Properties & Cards
      </h4>
      
      {player.getOutOfJailCards > 0 && (
        <div className="mb-2">
          <div className="bg-yellow-100 p-2 rounded-md border border-yellow-300 flex items-center">
            <span className="text-xs font-nunito font-semibold">
              Get Out of Jail Free Card × {player.getOutOfJailCards}
            </span>
          </div>
        </div>
      )}
      
      {Object.keys(groupedProperties).length === 0 && player.getOutOfJailCards === 0 && (
        <p className="text-xs text-gray-500 italic">No properties or cards owned</p>
      )}
      
      <div className="flex flex-wrap gap-1">
        {Object.entries(groupedProperties).map(([color, props]) => (
          <div key={color} className="flex flex-col">
            {props.map(property => (
              <div 
                key={property.id}
                onClick={() => onPropertyClick && onPropertyClick(property.id)}
                className={`
                  w-12 h-6 mb-1 rounded-sm cursor-pointer
                  border border-gray-300 shadow-sm hover:shadow-md
                  transition-shadow duration-200 overflow-hidden
                  ${color !== 'white' ? color : 'bg-gray-100'}
                `}
              >
                <div className="text-[6px] leading-tight p-0.5 bg-white bg-opacity-80 text-black font-nunito font-semibold truncate">
                  {property.name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerProperties;
