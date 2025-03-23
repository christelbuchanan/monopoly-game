export interface Property {
  id: number;
  position: number;
  name: string;
  price: number;
  rent: number[];
  color: string;
  type: 'property' | 'railroad' | 'utility' | 'chance' | 'community' | 'tax' | 'corner';
  owner: number | null;
  houses: number;
  mortgaged: boolean;
  housePrice: number;
  group?: string;
}

export interface Player {
  id: number;
  name: string;
  money: number;
  position: number;
  color: string;
  properties: number[];
  jailStatus: {
    inJail: boolean;
    turnsInJail: number;
  };
  piece: string;
  jailed: boolean;
  jailTurns: number;
  getOutOfJailCards: number;
}

export interface Card {
  id: number;
  text: string;
  action: string;
  value?: number;
}

export interface GameState {
  players: Player[];
  properties: Property[];
  currentPlayer: number;
  dice: number[];
  gameStarted: boolean;
  gameOver: boolean;
  winner: Player | null;
  doubleRolls: number;
  message: string;
}

export interface DiceProps {
  values: number[];
  isRolling: boolean;
  onRoll?: () => void;
}

export interface PropertyCardProps {
  property: Property;
  onBuy?: () => void;
  canBuy: boolean;
  currentPlayer: Player;
}

export interface PlayerCardProps {
  player: Player;
  isCurrentPlayer: boolean;
  properties?: Property[];
  onPropertyClick?: (propertyId: number) => void;
}

export interface GameControlsProps {
  onRollDice: () => void;
  onEndTurn: () => void;
  onBuyProperty: () => void;
  isRolling: boolean;
  canBuyProperty: boolean;
}

export interface GameMessageProps {
  message: string;
}

export interface StartScreenProps {
  onStartGame: (playerCount: number, playerNames: string[], playerPieces: string[]) => void;
}

export interface GameOverScreenProps {
  winner: Player | null;
  onRestart: () => void;
}

export interface PropertyDetailProps {
  property: Property | null;
  currentPlayer: Player;
  onBuyProperty: () => void;
  onClose: () => void;
}
