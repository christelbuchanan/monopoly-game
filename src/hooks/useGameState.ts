import { useState, useEffect } from 'react';
import { GameState, Player, Property, Card } from '../types';
import { properties as initialProperties } from '../data/properties';
import { chanceCards, communityChestCards } from '../data/cards';

const INITIAL_MONEY = 1500;
const GO_MONEY = 200;

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    properties: initialProperties,
    currentPlayer: 0,
    dice: [1, 1],
    gameStarted: false,
    gameOver: false,
    winner: null,
    doubleRolls: 0,
    message: ''
  });

  const [chanceCardDeck, setChanceCardDeck] = useState([...chanceCards].sort(() => Math.random() - 0.5));
  const [communityCardDeck, setCommunityCardDeck] = useState([...communityChestCards].sort(() => Math.random() - 0.5));
  const [diceRolling, setDiceRolling] = useState(false);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentCard, setCurrentCard] = useState<{ type: 'chance' | 'community', text: string } | null>(null);

  const startGame = (playerCount: number, playerNames: string[], playerPieces: string[]) => {
    const playerColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
    
    const players = Array.from({ length: playerCount }).map((_, index) => ({
      id: index,
      name: playerNames[index] || `Player ${index + 1}`,
      money: INITIAL_MONEY,
      position: 0,
      color: playerColors[index],
      properties: [],
      jailStatus: {
        inJail: false,
        turnsInJail: 0
      },
      piece: playerPieces[index] || '🎲',
      jailed: false,
      jailTurns: 0,
      getOutOfJailCards: 0
    }));
    
    setGameState({
      ...gameState,
      players,
      gameStarted: true,
      currentPlayer: 0,
      gameOver: false,
      winner: null,
      message: `Game started! ${players[0].name}'s turn.`
    });
  };

  const rollDice = () => {
    if (diceRolling || gameState.gameOver) return;
    
    setDiceRolling(true);
    
    setTimeout(() => {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      const isDouble = die1 === die2;
      
      setGameState(prevState => {
        const currentPlayer = { ...prevState.players[prevState.currentPlayer] };
        let doubleRolls = isDouble ? prevState.doubleRolls + 1 : 0;
        let message = `${currentPlayer.name} rolled ${die1 + die2}`;
        
        // Check if player is in jail
        if (currentPlayer.jailStatus.inJail) {
          if (isDouble) {
            currentPlayer.jailStatus.inJail = false;
            currentPlayer.jailStatus.turnsInJail = 0;
            message = `${currentPlayer.name} rolled doubles and got out of jail!`;
          } else {
            currentPlayer.jailStatus.turnsInJail += 1;
            
            if (currentPlayer.jailStatus.turnsInJail >= 3) {
              currentPlayer.money -= 50;
              currentPlayer.jailStatus.inJail = false;
              currentPlayer.jailStatus.turnsInJail = 0;
              message = `${currentPlayer.name} paid $50 to get out of jail after 3 turns.`;
            } else {
              message = `${currentPlayer.name} is still in jail. ${3 - currentPlayer.jailStatus.turnsInJail} more turns.`;
              return {
                ...prevState,
                dice: [die1, die2],
                message,
                players: prevState.players.map(p => p.id === currentPlayer.id ? currentPlayer : p),
                currentPlayer: (prevState.currentPlayer + 1) % prevState.players.length
              };
            }
          }
        }
        
        // Check for 3 doubles in a row (go to jail)
        if (doubleRolls === 3) {
          currentPlayer.position = 10;
          currentPlayer.jailStatus.inJail = true;
          currentPlayer.jailStatus.turnsInJail = 0;
          message = `${currentPlayer.name} rolled 3 doubles in a row and went to jail!`;
          
          return {
            ...prevState,
            dice: [die1, die2],
            doubleRolls: 0,
            message,
            players: prevState.players.map(p => p.id === currentPlayer.id ? currentPlayer : p),
            currentPlayer: (prevState.currentPlayer + 1) % prevState.players.length
          };
        }
        
        // Move player
        const oldPosition = currentPlayer.position;
        currentPlayer.position = (currentPlayer.position + die1 + die2) % 40;
        
        // Check if passed GO
        if (currentPlayer.position < oldPosition && !currentPlayer.jailStatus.inJail) {
          currentPlayer.money += GO_MONEY;
          message += ` and collected $${GO_MONEY} for passing GO`;
        }
        
        // Handle landing on Go To Jail
        if (currentPlayer.position === 30) {
          currentPlayer.position = 10;
          currentPlayer.jailStatus.inJail = true;
          currentPlayer.jailStatus.turnsInJail = 0;
          message = `${currentPlayer.name} landed on Go To Jail!`;
        }
        
        // Handle landing on special spaces
        const landedProperty = prevState.properties.find(p => p.position === currentPlayer.position);
        
        if (landedProperty) {
          if (landedProperty.type === 'tax') {
            currentPlayer.money -= landedProperty.rent[0];
            message += ` and paid $${landedProperty.rent[0]} in taxes`;
          } else if (landedProperty.type === 'chance') {
            message += ` and landed on Chance`;
            // Automatically draw a chance card
            setTimeout(() => {
              drawCard('chance');
            }, 500);
          } else if (landedProperty.type === 'community') {
            message += ` and landed on Community Chest`;
            // Automatically draw a community chest card
            setTimeout(() => {
              drawCard('community');
            }, 500);
          } else if (landedProperty.owner !== null && landedProperty.owner !== currentPlayer.id && !landedProperty.mortgaged) {
            // Pay rent
            const owner = { ...prevState.players[landedProperty.owner] };
            let rent = landedProperty.rent[0];
            
            if (landedProperty.type === 'property') {
              rent = landedProperty.rent[landedProperty.houses];
            } else if (landedProperty.type === 'railroad') {
              const railroadsOwned = prevState.properties.filter(
                p => p.type === 'railroad' && p.owner === landedProperty.owner
              ).length;
              rent = landedProperty.rent[railroadsOwned - 1];
            } else if (landedProperty.type === 'utility') {
              const utilitiesOwned = prevState.properties.filter(
                p => p.type === 'utility' && p.owner === landedProperty.owner
              ).length;
              rent = (die1 + die2) * (utilitiesOwned === 1 ? 4 : 10);
            }
            
            currentPlayer.money -= rent;
            owner.money += rent;
            
            message += ` and paid $${rent} rent to ${owner.name}`;
            
            // Update players array with the owner's new money
            const updatedPlayers = prevState.players.map(p => {
              if (p.id === currentPlayer.id) return currentPlayer;
              if (p.id === owner.id) return owner;
              return p;
            });
            
            return {
              ...prevState,
              dice: [die1, die2],
              doubleRolls,
              message,
              players: updatedPlayers,
              currentPlayer: isDouble ? prevState.currentPlayer : (prevState.currentPlayer + 1) % prevState.players.length
            };
          } else if (['property', 'railroad', 'utility'].includes(landedProperty.type) && landedProperty.owner === null) {
            // Show property detail when landing on an unowned property
            setSelectedPropertyId(landedProperty.id);
            setShowPropertyDetail(true);
          }
        }
        
        return {
          ...prevState,
          dice: [die1, die2],
          doubleRolls,
          message,
          players: prevState.players.map(p => p.id === currentPlayer.id ? currentPlayer : p),
          currentPlayer: isDouble ? prevState.currentPlayer : (prevState.currentPlayer + 1) % prevState.players.length
        };
      });
      
      setDiceRolling(false);
    }, 1000);
  };

  const buyProperty = () => {
    if (!selectedPropertyId) return;
    
    setGameState(prevState => {
      const currentPlayer = { ...prevState.players[prevState.currentPlayer] };
      const property = { ...prevState.properties.find(p => p.id === selectedPropertyId)! };
      
      if (property.owner !== null || property.type === 'corner' || property.type === 'chance' || 
          property.type === 'community' || property.type === 'tax' || currentPlayer.money < property.price) {
        return {
          ...prevState,
          message: `Cannot buy ${property.name}. ${
            property.owner !== null ? 'It is already owned.' :
            property.type === 'corner' || property.type === 'chance' || property.type === 'community' || property.type === 'tax' ? 'This space cannot be purchased.' :
            currentPlayer.money < property.price ? 'Not enough money.' : ''
          }`
        };
      }
      
      currentPlayer.money -= property.price;
      property.owner = currentPlayer.id;
      
      // Update player's properties array
      const updatedProperties = [...currentPlayer.properties, property.id];
      const updatedPlayer = {
        ...currentPlayer,
        properties: updatedProperties
      };
      
      const message = `${currentPlayer.name} bought ${property.name} for $${property.price}`;
      
      setShowPropertyDetail(false);
      
      return {
        ...prevState,
        message,
        players: prevState.players.map(p => p.id === currentPlayer.id ? updatedPlayer : p),
        properties: prevState.properties.map(p => p.id === property.id ? property : p)
      };
    });
  };

  const endTurn = () => {
    setGameState(prevState => {
      // Check for bankruptcy
      const currentPlayer = prevState.players[prevState.currentPlayer];
      
      if (currentPlayer.money < 0) {
        // Player is bankrupt
        const remainingPlayers = prevState.players.filter(p => p.id !== currentPlayer.id && p.money >= 0);
        
        if (remainingPlayers.length === 1) {
          // Game over, we have a winner
          return {
            ...prevState,
            gameOver: true,
            winner: remainingPlayers[0],
            message: `${remainingPlayers[0].name} wins the game!`
          };
        }
        
        // Release all properties
        const updatedProperties = prevState.properties.map(p => {
          if (p.owner === currentPlayer.id) {
            return { ...p, owner: null, houses: 0, mortgaged: false };
          }
          return p;
        });
        
        return {
          ...prevState,
          properties: updatedProperties,
          players: prevState.players.map(p => p.id === currentPlayer.id ? { ...p, money: 0 } : p),
          currentPlayer: (prevState.currentPlayer + 1) % prevState.players.length,
          message: `${currentPlayer.name} is bankrupt and out of the game!`
        };
      }
      
      // Normal turn end
      const nextPlayer = prevState.players[(prevState.currentPlayer + 1) % prevState.players.length];
      return {
        ...prevState,
        currentPlayer: (prevState.currentPlayer + 1) % prevState.players.length,
        message: `${nextPlayer.name}'s turn`
      };
    });
  };

  const drawCard = (cardType: 'chance' | 'community') => {
    if (cardType === 'chance') {
      const card = chanceCardDeck[0];
      const newDeck = [...chanceCardDeck.slice(1), card]; // Move the card to the end
      setChanceCardDeck(newDeck);
      
      // Set current card and show modal
      setCurrentCard({ type: 'chance', text: card.text });
      setShowCardModal(true);
      
      // Handle card action
      setGameState(prevState => ({
        ...prevState,
        message: `Chance: ${card.text}`
      }));
      
      // TODO: Implement card effects based on card.action and card.value
      // This would be implemented in a separate function
    } else {
      const card = communityCardDeck[0];
      const newDeck = [...communityCardDeck.slice(1), card]; // Move the card to the end
      setCommunityCardDeck(newDeck);
      
      // Set current card and show modal
      setCurrentCard({ type: 'community', text: card.text });
      setShowCardModal(true);
      
      // Handle card action
      setGameState(prevState => ({
        ...prevState,
        message: `Community Chest: ${card.text}`
      }));
      
      // TODO: Implement card effects based on card.action and card.value
      // This would be implemented in a separate function
    }
  };

  const closeCardModal = () => {
    setShowCardModal(false);
    setCurrentCard(null);
  };

  const buyHouse = (propertyId: number) => {
    // Implementation for buying houses
  };

  const sellHouse = (propertyId: number) => {
    // Implementation for selling houses
  };

  const mortgageProperty = (propertyId: number) => {
    // Implementation for mortgaging properties
  };

  const unmortgageProperty = (propertyId: number) => {
    // Implementation for unmortgaging properties
  };

  const restartGame = () => {
    setChanceCardDeck([...chanceCards].sort(() => Math.random() - 0.5));
    setCommunityCardDeck([...communityChestCards].sort(() => Math.random() - 0.5));
    
    setGameState({
      players: [],
      properties: initialProperties,
      currentPlayer: 0,
      dice: [1, 1],
      gameStarted: false,
      gameOver: false,
      winner: null,
      doubleRolls: 0,
      message: ''
    });
  };

  const closePropertyDetail = () => {
    setShowPropertyDetail(false);
    setSelectedPropertyId(null);
  };

  // Get the current player's position for the Board component
  const currentPlayerPosition = gameState.players[gameState.currentPlayer]?.position || 0;

  // Get the selected property
  const selectedProperty = selectedPropertyId !== null 
    ? gameState.properties.find(p => p.id === selectedPropertyId) || null
    : null;

  // For compatibility with the App component
  const properties = gameState.properties;
  const players = gameState.players;
  const currentPlayer = gameState.currentPlayer;
  const currentPlayerObj = players[currentPlayer] || { money: 0, id: -1 };
  const diceValues = gameState.dice;
  const gameMessage = gameState.message;
  const isRolling = diceRolling;
  const gameOver = gameState.gameOver;
  const winner = gameState.winner;
  
  const selectProperty = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
    setShowPropertyDetail(true);
  };

  return {
    gameState: gameState.gameStarted ? (gameState.gameOver ? 'gameOver' : 'roll') : 'start',
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
    buyHouse,
    sellHouse,
    mortgageProperty,
    unmortgageProperty,
    restartGame,
    drawCard,
    currentPlayerPosition,
    showPropertyDetail,
    closePropertyDetail,
    showCardModal,
    currentCard,
    closeCardModal
  };
};

export default useGameState;
