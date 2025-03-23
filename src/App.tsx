import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Dice from './components/Dice';
import PlayerCard from './components/PlayerCard';
import PropertyCard from './components/PropertyCard';
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
    selectedProperty,
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
    currentPlayerPosition,
    showPropertyDetail,
    closePropertyDetail,
    showCardModal,
    currentCard,
    closeCardModal
  } = useGameState();

  if (gameState === 'start') {
    return <StartScreen onStartGame={startGame} />;
  }

  if (gameState === 'gameOver') {
    return <GameOverScreen winner={winner} onRestart={restartGame} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-nunito">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-monopoly-blue mb-4">
          Sydney Eastern Suburbs Monopoly
          <span className="text-sm font-normal block text-gray-600">Buchanan Edition</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <Board 
              properties={properties} 
              players={players} 
              currentPlayerPosition={currentPlayerPosition}
              onPropertySelect={selectProperty}
            />
          </div>
          
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-monopoly-blue mb-4">Game Controls</h2>
              <Dice values={diceValues} isRolling={isRolling} />
              <GameControls 
                onRollDice={rollDice} 
                onEndTurn={endTurn} 
                onBuyProperty={buyProperty}
                isRolling={isRolling}
                canBuyProperty={selectedProperty !== null && selectedProperty.owner === null && 
                  ['property', 'railroad', 'utility'].includes(selectedProperty.type) && 
                  currentPlayerObj.money >= selectedProperty.price}
              />
              <GameMessage message={gameMessage} />
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-monopoly-blue mb-4">Players</h2>
              <div className="grid grid-cols-1 gap-4">
                {players.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    isCurrentPlayer={player.id === currentPlayer}
                    properties={properties}
                    onPropertyClick={selectProperty}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>Made with ❤️ by <a href="https://chatandbuild.com" target="_blank" rel="noopener noreferrer" className="text-monopoly-blue hover:underline">chatandbuild.com</a></p>
        </footer>
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
  );
}

export default App;
