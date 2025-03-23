import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';
import PlayerCard from './components/PlayerCard';
import GameControls from './components/GameControls';
import GameMessage from './components/GameMessage';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import PropertyDetail from './components/PropertyDetail';
import CardDrawModal from './components/CardDrawModal';
import useGameState from './hooks/useGameState';

function App() {
  const {
    gameState,
    properties,
    players,
    currentPlayer,
    currentPlayerObj,
    diceValues,
    gameMessage,
    isRolling,
    startGame,
    rollDice,
    endTurn,
    buyProperty,
    selectProperty,
    gameOver,
    winner,
    restartGame,
    drawCard,
    currentPlayerPosition,
    showPropertyDetail,
    closePropertyDetail,
    selectedProperty,
    showCardModal,
    currentCard,
    closeCardModal
  } = useGameState();

  const canBuyProperty = () => {
    if (!selectedProperty) return false;
    
    return (
      selectedProperty.owner === null && 
      ['property', 'railroad', 'utility'].includes(selectedProperty.type) &&
      currentPlayerObj.money >= selectedProperty.price
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {gameState === 'start' && (
        <StartScreen onStartGame={startGame} />
      )}
      
      {gameState === 'roll' && (
        <div className="flex-grow p-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <GameMessage message={gameMessage} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <Board 
                  properties={properties} 
                  players={players} 
                  currentPlayer={currentPlayer}
                  onDrawCard={drawCard}
                  currentPlayerPosition={currentPlayerPosition}
                  onSelectProperty={selectProperty}
                />
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-nunito font-bold mb-2">Current Player</h2>
                  {players.length > 0 && (
                    <PlayerCard 
                      player={currentPlayerObj} 
                      isCurrentPlayer={true} 
                    />
                  )}
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-nunito font-bold mb-2">Dice</h2>
                  <Dice 
                    values={diceValues} 
                    isRolling={isRolling} 
                    onRoll={rollDice}
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <GameControls 
                    onRollDice={rollDice} 
                    onEndTurn={endTurn} 
                    onBuyProperty={buyProperty}
                    isRolling={isRolling}
                    canBuyProperty={canBuyProperty()}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {showPropertyDetail && selectedProperty && (
            <PropertyDetail 
              property={selectedProperty}
              currentPlayer={currentPlayerObj}
              onBuyProperty={buyProperty}
              onClose={closePropertyDetail}
            />
          )}
          
          {showCardModal && currentCard && (
            <CardDrawModal
              cardType={currentCard.type}
              cardText={currentCard.text}
              onClose={closeCardModal}
            />
          )}
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <GameOverScreen winner={winner} onRestart={restartGame} />
      )}
      
      {/* Footer */}
      <footer className="py-4 text-center text-gray-600 font-nunito bg-white shadow-inner">
        <p>Made with ❤️ by <a href="https://chatandbuild.com" target="_blank" rel="noopener noreferrer" className="text-monopoly-blue hover:underline">chatandbuild.com</a></p>
      </footer>
    </div>
  );
}

export default App;
