# 📂 `src/views/` – Routed Views

This folder contains all the Vue components that serve as top-level routed pages in the Chess Web Frontend. These views are registered with Vue Router and correspond to the main sections of the application.

---

## 🧭 File Overview

### `Home.vue`

- **Path:** `/`
- **Purpose:** Acts as the landing page and game selection hub
- **Functionality:**
  - Displays available games as interactive cards
  - Offers options to start a new game (against AI or human)
  - Navigates the user to the appropriate game setup or session
- **API Integration:**
  - No direct API calls (pure navigation view)
  - Uses Vue Router for navigation to `/Chess`
- **Component Usage:**
  - `NavBar.vue` - Navigation header
  - Game cards with routing links
- **Data Flow:**
  ```javascript
  // Static game data
  const games = ref([
    {
      name: "Chess",
      description: "Play a standard game of chess with friends or AI.",
      image: "/chesssprites/wk.svg",
      route: "/Chess",
    },
  ]);
  ```

---

### `Chess.vue`

- **Path:** `/Chess`
- **Purpose:** Pre-game setup view for matchmaking and game creation
- **Functionality:**
  - Allows the user to create or join a game session
  - Displays a game code or link for sharing
  - Lets the player choose a side (white/black) before the game starts
- **API Integration:**

  - **Direct API Calls:**
    - `ChessApi.newGame(isAi)` - Creates new game
    - `ChessApi.chooseColor(gameId, color)` - Sets player color
  - **Data Flow:**

    ```javascript
    // Create new game
    const game = await this.chessApi.newGame(this.isAi);
    this.gameId = game.gameId;

    // Choose color
    await this.chessApi.chooseColor(this.gameId, this.selectedColor);
    ```

- **Component Usage:**
  - `NavBar.vue` - Navigation header
  - Form inputs for game creation
  - Color selection buttons
- **State Management:**
  - `gameId` - Current game identifier
  - `isAi` - Whether playing against AI
  - `selectedColor` - Player's chosen color

---

### `GameBoard.vue`

- **Path:** `/game/:gameId`
- **Purpose:** The main in-game interface where chess is played
- **Functionality:**
  - Renders the actual chessboard UI
  - Handles real-time interactions via Socket.IO
  - Interfaces with `ChessApi.js` to send moves, resign, offer draws, etc.
  - Displays game state, player info, turn status, and controls
- **API Integration:**

  - **Direct API Calls:**
    - `ChessApi.getInfo(gameId)` - Fetches game state
    - `ChessApi.movePiece(gameId, from, to, promoteTo)` - Makes moves
    - `ChessApi.resign(gameId)` - Player resignation
  - **WebSocket Events:**
    - Listens for `gameState` updates
    - Listens for `moveResult` confirmations
    - Listens for `gameEnd` events
  - **Data Flow:**

    ```javascript
    // Fetch initial game state
    const gameInfo = await this.chessApi.getInfo(this.gameId);
    this.gameState = gameInfo;

    // Handle moves
    async handleMove(moveData) {
      const result = await this.chessApi.movePiece(
        this.gameId,
        moveData.from,
        moveData.to,
        moveData.promoteTo
      );
      this.updateGameState(result);
    }

    // WebSocket listeners
    socket.on('gameState', (state) => {
      this.gameState = state;
      this.updateCapturedPieces(state.capturedPieces);
    });
    ```

- **Component Usage:**
  - `Chessboard.vue` - Main game board
  - `GameStatus.vue` - Game state and controls
  - `CapturedPieces.vue` - Shows captured pieces
  - `ChoicePopup.vue` - Pawn promotion choices
  - `MessagePopup.vue` - Game messages and confirmations
- **State Management:**
  - `gameState` - Current game state (FEN, turn, etc.)
  - `capturedWhite` / `capturedBlack` - Arrays of captured pieces
  - `selectedSquare` - Currently selected board square
  - `showPromotion` - Whether to show promotion popup

---

### `About.vue`

- **Path:** `/about`
- **Purpose:** Informational page about the project and developers
- **Functionality:**
  - Describes the purpose and scope of the app
  - Includes developer credits and links to GitHub and portfolio
  - Provides technical details about the implementation
- **API Integration:**
  - No API calls (static content)
  - External links to GitHub and portfolio
- **Component Usage:**
  - `NavBar.vue` - Navigation header
  - Static content with styled layout
- **Data Flow:**
  - No dynamic data (static content only)

---

## 🔄 Data Flow Patterns

### Game State Management

```javascript
// GameBoard.vue - Central state management
export default {
  data() {
    return {
      gameState: {},
      capturedWhite: [],
      capturedBlack: [],
      selectedSquare: null,
    };
  },

  methods: {
    // Update game state from API
    async updateGameState(newState) {
      this.gameState = newState;
      this.updateCapturedPieces(newState.capturedPieces);
    },

    // Update captured pieces
    updateCapturedPieces(capturedPieces) {
      if (typeof capturedPieces === "string") {
        // Handle legacy format
        this.parseLegacyCapturedPieces(capturedPieces);
      } else {
        // Handle new format
        this.capturedWhite = capturedPieces.white || [];
        this.capturedBlack = capturedPieces.black || [];
      }
    },
  },
};
```

### Component Communication

```javascript
// Parent view passes data to child components
<Chessboard
  :fen="gameState.fen"
  :selectedSquare="selectedSquare"
  @move="handleMove"
/>

<GameStatus
  :gameId="gameId"
  :gameState="gameState"
  @resign="handleResign"
  @offerDraw="handleOfferDraw"
/>

<CapturedPieces
  :pieces="capturedWhite"
  side="white"
/>
```

---

## 🔌 API Integration Details

### ChessApi Usage Patterns

```javascript
// Game creation flow
async createGame() {
  try {
    const game = await this.chessApi.newGame(this.isAi);
    this.gameId = game.gameId;

    if (!this.isAi) {
      // Wait for opponent to join
      this.waitForOpponent();
    } else {
      // Start AI game immediately
      this.startGame();
    }
  } catch (error) {
    this.handleError(error);
  }
}

// Move handling
async handleMove(moveData) {
  try {
    const result = await this.chessApi.movePiece(
      this.gameId,
      moveData.from,
      moveData.to,
      moveData.promoteTo
    );

    if (result.success) {
      this.updateGameState(result);
    }
  } catch (error) {
    this.showError('Invalid move: ' + error.message);
  }
}
```

### WebSocket Event Handling

```javascript
// Socket event listeners
mounted() {
  // Join game room
  socket.emit('joinGame', {
    gameId: this.gameId,
    playerId: this.playerId
  });

  // Listen for game updates
  socket.on('gameState', (state) => {
    this.gameState = state;
    this.updateCapturedPieces(state.capturedPieces);
  });

  // Listen for move confirmations
  socket.on('moveResult', (result) => {
    if (result.success) {
      this.updateGameState(result);
    } else {
      this.showError(result.message);
    }
  });

  // Listen for game end
  socket.on('gameEnd', (result) => {
    this.handleGameEnd(result);
  });
}
```

---

## 🎨 Styling and Layout

### Background System

All views use a consistent background system:

```vue
<template>
  <div class="bg-layer"></div>
  <div class="content">
    <!-- View content -->
  </div>
</template>

<style scoped>
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  z-index: -1;
}

.content {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 8vh);
  padding: var(--spacing-xl);
}
</style>
```

### Responsive Design

```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .content {
    padding: var(--spacing-lg);
  }

  .game-container {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .content {
    padding: var(--spacing-md);
  }
}
```

---

## 🚨 Error Handling

### API Error Handling

```javascript
// Centralized error handling
async apiCall(apiMethod, ...args) {
  try {
    return await apiMethod(...args);
  } catch (error) {
    this.handleApiError(error);
    throw error;
  }
}

handleApiError(error) {
  console.error('API Error:', error);

  switch (error.code) {
    case 'GAME_NOT_FOUND':
      this.$router.push('/Chess');
      break;
    case 'INVALID_MOVE':
      this.showError('Invalid move: ' + error.message);
      break;
    default:
      this.showError('An error occurred: ' + error.message);
  }
}
```

### User Feedback

```javascript
// Toast notifications and error messages
showError(message) {
  this.errorMessage = message;
  this.showErrorPopup = true;

  setTimeout(() => {
    this.showErrorPopup = false;
  }, 5000);
}

showSuccess(message) {
  this.successMessage = message;
  this.showSuccessPopup = true;

  setTimeout(() => {
    this.showSuccessPopup = false;
  }, 3000);
}
```

---

## 🔗 Related

- **Router**: `src/router/index.js` – Handles route configuration for these views
- **API Layer**: `ChessApi.js` & `ChessSocket.js` – Used primarily in `GameBoard.vue` and `Chess.vue`
- **Components**: All views use components from `src/components/`
- **Global Styles**: Views inherit from `src/style.css` and use consistent theming

---

## 🚀 Performance Considerations

### Lazy Loading

```javascript
// Route-level code splitting
const GameBoard = () => import("../views/GameBoard.vue");
const Chess = () => import("../views/Chess.vue");
```

### State Optimization

```javascript
// Debounced API calls
const debouncedUpdate = debounce(async (gameId) => {
  const info = await this.chessApi.getInfo(gameId);
  this.updateGameState(info);
}, 300);

// Memoized computed properties
computed: {
  gameStatus() {
    return this.gameState.status || 'waiting';
  }
}
```

### Memory Management

```javascript
// Cleanup on component destruction
beforeUnmount() {
  socket.off('gameState');
  socket.off('moveResult');
  socket.off('gameEnd');
}
```
