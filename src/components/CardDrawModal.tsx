import React from 'react';

interface CardDrawModalProps {
  cardType: 'chance' | 'community';
  cardText: string;
  onClose: () => void;
}

const CardDrawModal: React.FC<CardDrawModalProps> = ({ cardType, cardText, onClose }) => {
  const isChance = cardType === 'chance';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        {/* Card header */}
        <div 
          className={`h-16 flex items-center justify-center ${
            isChance ? 'bg-orange-500' : 'bg-blue-500'
          }`}
        >
          <h2 className="text-white font-nunito font-bold text-xl">
            {isChance ? 'CHANCE' : 'COMMUNITY CHEST'}
          </h2>
        </div>
        
        {/* Card content */}
        <div className="p-6">
          <div className={`
            border-4 ${isChance ? 'border-orange-500' : 'border-blue-500'} 
            rounded-lg p-4 mb-4 min-h-[150px] flex items-center justify-center
          `}>
            <p className="font-nunito text-center text-lg">{cardText}</p>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className={`
                py-2 px-6 text-white font-nunito font-bold rounded-lg shadow-md 
                transition-colors duration-300 ${
                  isChance ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
                }
              `}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDrawModal;
