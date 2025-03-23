# Sydney Eastern Suburbs Monopoly

A digital adaptation of the classic Monopoly board game featuring locations from Sydney's Eastern Suburbs. This web-based implementation allows 2-4 players to enjoy the game on a single device.

## 🎮 Features

- **Sydney Eastern Suburbs Theme**: Properties based on real locations in Sydney's Eastern Suburbs
- **2-4 Player Support**: Play with friends on a single device
- **Full Game Mechanics**:
  - Property purchasing
  - Rent collection
  - Chance and Community Chest cards
  - Jail system
  - Passing GO
  - Bankruptcy handling
- **Interactive Board**: Beautifully designed board with interactive property tiles
- **Dice Rolling Animation**: Realistic dice rolling experience
- **Property Details**: View detailed information about properties
- **Game State Management**: Automatic tracking of player turns, money, and property ownership

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sydney-monopoly.git
   cd sydney-monopoly
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎲 How to Play

1. **Start Screen**: Select the number of players (2-4) and customize player names and pieces
2. **Game Play**:
   - Roll dice on your turn by clicking the "Roll Dice" button
   - Land on properties to purchase them (if available)
   - Pay rent when landing on properties owned by other players
   - Draw Chance or Community Chest cards when landing on those spaces
   - Collect $200 when passing GO
   - Go to Jail when landing on "Go to Jail" or rolling three doubles in a row
3. **Game End**: The game ends when all players except one go bankrupt

## 🛠️ Technology Stack

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Next-generation frontend tooling for fast development
- **Lucide React**: Beautiful, consistent icons

## 📁 Project Structure

```
sydney-monopoly/
├── public/
├── src/
│   ├── components/         # React components
│   │   ├── Board.tsx       # Game board component
│   │   ├── Dice.tsx        # Dice rolling component
│   │   ├── PropertyTile.tsx # Individual property tiles
│   │   └── ...
│   ├── data/               # Game data
│   │   ├── properties.ts   # Property definitions
│   │   └── cards.ts        # Chance and Community Chest cards
│   ├── hooks/              # Custom React hooks
│   │   └── useGameState.ts # Game state management
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── package.json
└── README.md
```

## 🎨 Customization

The game can be customized by modifying the following files:

- `src/data/properties.ts`: Change property names, prices, and colors
- `src/data/cards.ts`: Modify Chance and Community Chest card effects
- `tailwind.config.js`: Adjust theme colors and other styling variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Inspired by the classic Monopoly board game by Hasbro
- Sydney Eastern Suburbs landmarks and locations
- Buchanan Edition special features

---

Made with ❤️ by [chatandbuild.com](https://chatandbuild.com)
