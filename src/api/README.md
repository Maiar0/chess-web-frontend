# 📂 `src/api/` – API Integration Layer

This folder contains the API client classes and WebSocket integration for communicating with the Chess backend server. It provides a clean interface for all game operations and real-time updates.

---

## 🧩 File Overview

### `ChessApi.js`

Main API client class that handles all HTTP requests to the backend chess server.

### `ChessSocket.js`

WebSocket client for real-time game updates and bidirectional communication.

---

## 🔌 ChessApi.js - HTTP API Endpoints

### Base Configuration

- **Base URL**: Configurable via `VITE_API_URL` environment variable, defaults to `/api/chess`
- **Authentication**: Uses `playerId` stored in localStorage (auto-generated UUID)
- **Content-Type**: `application/json`

---

### 📡 API Endpoints

#### 1. **Create New Game**

```javascript
async newGame(isAi = false)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/newGame`
- **Body**:

```json
{
  "payload": {
    "isAi": boolean
  },
  "playerId": "string"
}
```

**Response:**

```json
{
  "gameId": "string",
  "status": "string",
  "message": "string"
}
```

**Example Usage:**

```javascript
const api = new ChessApi();
const game = await api.newGame(true); // vs AI
console.log(game.gameId);
```

---

#### 2. **Get Game Information**

```javascript
async getInfo(gameId)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/getInfo`
- **Body**:

```json
{
  "gameId": "string",
  "playerId": "string"
}
```

**Response:**

```json
{
  "gameId": "string",
  "status": "string",
  "fen": "string",
  "turn": "string",
  "capturedPieces": {
    "white": ["string"],
    "black": ["string"]
  },
  "gameOver": boolean,
  "winner": "string|null"
}
```

**Example Usage:**

```javascript
const gameInfo = await api.getInfo("game-123");
console.log(gameInfo.fen);
```

---

#### 3. **Move Piece**

```javascript
async movePiece(gameId, from, to, promoteTo = '')
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/move`
- **Body**:

```json
{
  "gameId": "string",
  "payload": {
    "from": {
      "x": number,
      "y": number
    },
    "to": {
      "x": number,
      "y": number
    },
    "promoteTo": "string"
  },
  "playerId": "string"
}
```

**Parameters:**

- `from`: `{x: number, y: number}` - Starting position
- `to`: `{x: number, y: number}` - Target position
- `promoteTo`: `string` - Piece type for pawn promotion (optional)

**Response:**

```json
{
  "success": boolean,
  "message": "string",
  "fen": "string",
  "capturedPieces": {
    "white": ["string"],
    "black": ["string"]
  }
}
```

**Example Usage:**

```javascript
const move = await api.movePiece("game-123", { x: 6, y: 6 }, { x: 6, y: 4 });
```

---

#### 4. **Choose Color**

```javascript
async chooseColor(gameId, color)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/chooseColor`
- **Body**:

```json
{
  "action": "chooseColor",
  "gameId": "string",
  "payload": {
    "color": "string"
  },
  "playerId": "string"
}
```

**Parameters:**

- `color`: `"white"` | `"black"`

**Response:**

```json
{
  "success": boolean,
  "message": "string",
  "color": "string"
}
```

**Example Usage:**

```javascript
await api.chooseColor("game-123", "white");
```

---

#### 5. **Request End Game**

```javascript
async requestEndGame(gameId, type)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/requestEndGame`
- **Body**:

```json
{
  "gameId": "string",
  "playerId": "string",
  "payload": {
    "type": "string"
  }
}
```

**Parameters:**

- `type`: `"resign"` | `"draw"` | `"claimDraw"`

**Response:**

```json
{
  "success": boolean,
  "message": "string"
}
```

**Example Usage:**

```javascript
await api.requestEndGame("game-123", "draw");
```

---

#### 6. **Respond to Draw Offer**

```javascript
async respondDraw(gameId, accept)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/drawResponse`
- **Body**:

```json
{
  "gameId": "string",
  "playerId": "string",
  "payload": {
    "accept": boolean
  }
}
```

**Parameters:**

- `accept`: `boolean` - Whether to accept the draw offer

**Response:**

```json
{
  "success": boolean,
  "message": "string"
}
```

**Example Usage:**

```javascript
await api.respondDraw("game-123", true);
```

---

#### 7. **Resign Game**

```javascript
async resign(gameId)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/resign`
- **Body**:

```json
{
  "gameId": "string",
  "playerId": "string",
  "payload": {
    "resign": true
  }
}
```

**Response:**

```json
{
  "success": boolean,
  "message": "string"
}
```

**Example Usage:**

```javascript
await api.resign("game-123");
```

---

#### 8. **Claim Draw**

```javascript
async claimDraw(gameId)
```

**Request:**

- **Method**: `POST`
- **Endpoint**: `/claimDraw`
- **Body**:

```json
{
  "gameId": "string",
  "playerId": "string",
  "payload": {
    "claimDraw": true
  }
}
```

**Response:**

```json
{
  "success": boolean,
  "message": "string"
}
```

**Example Usage:**

```javascript
await api.claimDraw("game-123");
```

---

## 🔌 ChessSocket.js - WebSocket Events

### Connection

- **URL**: Configurable via `VITE_SOCKET_URL`, defaults to `http://localhost:5000`
- **Auto-connect**: Enabled by default
- **Connection Events**: Logs connection status and socket ID

### Socket Events

#### **Connection Events**

```javascript
socket.on("connect", () => {
  console.log("Connected with ID:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});
```

#### **Game Events** (Expected from backend)

```javascript
// Join game room
socket.emit("joinGame", { gameId, playerId });

// Listen for game state updates
socket.on("gameState", (state) => {
  // Handle updated game state
});

// Listen for move confirmations
socket.on("moveResult", (result) => {
  // Handle move success/failure
});

// Listen for game end events
socket.on("gameEnd", (result) => {
  // Handle checkmate, draw, resignation
});
```

---

## 🚨 Error Handling

All API methods throw errors with:

- **Message**: Human-readable error description
- **Code**: Backend error code for programmatic handling

**Example Error Handling:**

```javascript
try {
  const result = await api.movePiece(gameId, from, to);
} catch (error) {
  console.error(`Error ${error.code}: ${error.message}`);
  // Handle specific error codes
  if (error.code === "INVALID_MOVE") {
    // Show invalid move message
  }
}
```

---

## 🔧 Usage Examples

### Complete Game Flow

```javascript
const api = new ChessApi();

// 1. Create new game
const game = await api.newGame(false);
const gameId = game.gameId;

// 2. Choose color
await api.chooseColor(gameId, "white");

// 3. Make moves
await api.movePiece(gameId, { x: 6, y: 6 }, { x: 6, y: 4 });

// 4. Get updated game state
const gameInfo = await api.getInfo(gameId);

// 5. End game if needed
await api.resign(gameId);
```

---

## 🧠 Design Notes

- **Singleton Pattern**: Each instance maintains its own `playerId`
- **Promise-based**: All methods return promises for async operations
- **Error Propagation**: Backend errors are properly propagated with context
- **Flexible Payloads**: Most endpoints accept a `payload` object for extensibility

---

## 🔗 Related

- Used by `GameBoard.vue` for game actions
- Used by `Chess.vue` for game setup
- Integrates with `ChessSocket.js` for real-time updates
- Backend endpoints defined in Express.js server
