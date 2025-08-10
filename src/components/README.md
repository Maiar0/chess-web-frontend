# 📂 `src/components/` – Reusable UI Components

This folder houses the reusable, encapsulated components that power the user interface of the Chess Web Frontend. These are used across routed views like `GameBoard.vue`, `Home.vue`, and `Chess.vue`.

---

## 🧱 Component Overview

### �� `Chessboard.vue`

- **Purpose**: Core visual and interactive chessboard component
- **Key Features**:
  - Renders 8x8 chess grid with pieces
  - Handles piece selection and movement
  - Highlights valid moves and selected pieces
  - Manages pawn promotion UI
- **API Integration**:
  - Emits `move` events to parent with `{from, to, promoteTo}` data
  - Receives `fen` string prop for board state
  - Receives `selectedSquare` prop for highlighting
- **Data Flow**:

  ```javascript
  // Emits to parent
  emit("move", { from: { x, y }, to: { x, y }, promoteTo: "q" });

  // Receives from parent
  props: ["fen", "selectedSquare", "validMoves"];
  ```

---

### 🧩 `CapturedPieces.vue`

- **Purpose**: Displays captured pieces for each player
- **Key Features**:
  - Shows captured pieces in organized grid
  - Color-coded borders (white: teal, black: dark teal)
  - Responsive design for mobile/desktop
- **API Integration**:
  - Receives `pieces` array prop from parent
  - No direct API calls (data flows through parent)
- **Data Flow**:

  ```javascript
  // Receives from parent
  props: ["pieces", "side"]; // side: 'white' | 'black'

  // Data structure
  pieces: ["P", "N", "B", "R", "Q"]; // Piece abbreviations
  ```

---

### 🧩 `ChoicePopup.vue`

- **Purpose**: Modal interface for in-game decision prompts
- **Key Features**:
  - Pawn promotion choice (queen, rook, bishop, knight)
  - Customizable options via props
  - Animated appearance/disappearance
- **API Integration**:
  - Emits `choice` event with selected value
  - No direct API calls
- **Data Flow**:

  ```javascript
  // Emits to parent
  emit("choice", "q"); // 'q' for queen, 'r' for rook, etc.

  // Receives from parent
  props: ["show", "options", "title"];
  ```

---

### 🧩 `GameStatus.vue`

- **Purpose**: Displays current game state and controls
- **Key Features**:
  - Shows game ID, turn, move counters
  - Displays check/checkmate status
  - Action buttons (resign, offer draw, claim draw)
- **API Integration**:
  - Direct API calls for game actions
  - Uses `ChessApi` instance for:
    - `resign(gameId)`
    - `requestEndGame(gameId, 'draw')`
    - `claimDraw(gameId)`
- **Data Flow**:

  ```javascript
  // Receives from parent
  props: ["gameId", "gameState", "turn", "moveCount"];

  // API calls
  await this.chessApi.resign(this.gameId);
  await this.chessApi.requestEndGame(this.gameId, "draw");
  ```

---

### 🧩 `MessagePopup.vue`

- **Purpose**: Handles messages requiring user acknowledgment
- **Key Features**:
  - Dynamic message content
  - Confirm/cancel buttons
  - Draw offer responses
- **API Integration**:
  - Direct API calls for draw responses
  - Uses `ChessApi.respondDraw(gameId, accept)`
- **Data Flow**:

  ```javascript
  // Receives from parent
  props: ["show", "message", "type", "gameId"];

  // API calls
  await this.chessApi.respondDraw(this.gameId, true / false);
  ```

---

### 🧩 `NavBar.vue`

- **Purpose**: Header navigation bar with routing
- **Key Features**:
  - Fixed positioning at top
  - Responsive design
  - Navigation links (Home, About, current game)
- **API Integration**: None (pure navigation component)
- **Data Flow**:

  ```javascript
  // Receives from parent
  props: ["currentGame"]; // Optional: current game info

  // Emits to parent
  emit("navigate", route);
  ```

---

### 🧩 `Footer.vue`

- **Purpose**: Branding and author credit footer
- **Key Features**:
  - Static content
  - Responsive layout
- **API Integration**: None (static component)

---

## 🔄 Component Communication Patterns

### Parent-Child Data Flow

```javascript
// Parent (GameBoard.vue)
<Chessboard
  :fen="gameState.fen"
  :selectedSquare="selectedSquare"
  @move="handleMove"
/>

// Child emits event
this.$emit('move', { from, to, promoteTo });

// Parent handles event
handleMove(moveData) {
  this.chessApi.movePiece(this.gameId, moveData.from, moveData.to, moveData.promoteTo);
}
```

### Sibling Component Communication

```javascript
// GameBoard.vue coordinates between components
<GameStatus
  :gameId="gameId"
  :gameState="gameState"
  @resign="handleResign"
  @offerDraw="handleOfferDraw"
/>

<MessagePopup
  :show="showDrawOffer"
  :message="drawOfferMessage"
  @respond="handleDrawResponse"
/>
```

---

## 🧠 Design Principles

### Component Architecture

- **Single Responsibility**: Each component has one clear purpose
- **Props Down, Events Up**: Data flows down via props, actions flow up via events
- **Composition over Inheritance**: Components compose together rather than inherit
- **Scoped Styling**: CSS is scoped to prevent style conflicts

### State Management

- **Local State**: Component-specific state (UI state, form data)
- **Shared State**: Game state managed in parent views
- **API State**: Server data fetched and managed at view level

### Performance Considerations

- **Lazy Loading**: Components load only when needed
- **Memoization**: Expensive computations cached where appropriate
- **Event Debouncing**: Rapid events (like piece dragging) are debounced

---

## 🔌 API Integration Patterns

### Direct API Calls

Components that need to perform actions directly:

- `GameStatus.vue` - Game actions (resign, draw)
- `MessagePopup.vue` - Response actions

### Event-Based Integration

Components that emit events for parent handling:

- `Chessboard.vue` - Move events
- `ChoicePopup.vue` - Choice selection

### Data Display Only

Components that only display data:

- `CapturedPieces.vue` - Shows captured pieces
- `NavBar.vue` - Navigation display

---

## 📱 Responsive Design

### Breakpoint Strategy

- **Desktop**: 768px+ - Full layout with side panels
- **Tablet**: 600px-768px - Adjusted spacing and layout
- **Mobile**: <600px - Stacked layout, reduced padding

### Component Adaptations

- `Chessboard.vue`: Maintains square size, adjusts container
- `GameStatus.vue`: Stacks elements vertically on mobile
- `CapturedPieces.vue`: Reduces piece size and spacing

---

## 🎨 Styling System

### CSS Variables

Components use global CSS variables for consistency:

```css
:root {
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### Theme Integration

- **Green/Teal Palette**: Primary colors for interactive elements
- **Glassmorphism**: Translucent backgrounds with backdrop blur
- **Gradients**: Subtle gradients for visual depth

---

## 🔗 Related

- **Views**: Used primarily in `GameBoard.vue`, `Home.vue`, and `Chess.vue`
- **API Layer**: Integrates with `ChessApi.js` and `ChessSocket.js`
- **Router**: Navigation components use Vue Router
- **Global Styles**: Components inherit from `src/style.css`

---

## 🚀 Future Enhancements

### Planned Features

- **Animation System**: Smooth transitions between game states
- **Accessibility**: ARIA labels and keyboard navigation
- **Internationalization**: Multi-language support
- **Theme Switching**: Light/dark mode toggle

### Performance Improvements

- **Virtual Scrolling**: For large captured pieces lists
- **Lazy Rendering**: Components render only when visible
- **Bundle Splitting**: Code splitting for better load times
