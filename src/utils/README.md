# 📂 `src/utils/` – Utility Functions

This folder contains standalone utility modules that provide reusable logic outside the scope of UI components or views. These utilities handle chess-specific logic, data parsing, and common operations used throughout the application.

---

## 📄 ChessUtil.js

Contains helper methods for FEN parsing and chess-specific rule logic. This utility class provides stateless, pure functions that can be safely used across different components without side effects.

---

## ✅ Exported Static Methods

### `parseFen(fen: string): string[][]`

**Purpose**: Converts a FEN (Forsyth-Edwards Notation) string into a 2D board array representation.

**Parameters**:

- `fen: string` - A valid FEN string representing a chess position

**Returns**: `string[][]` - 2D array representing the chess board

**Board Layout**:

- `board[0]` represents rank 8 (top of board)
- `board[7]` represents rank 1 (bottom of board)
- Each cell contains:
  - A piece character (`'P'`, `'n'`, `'k'`, etc.), or
  - `null` if the square is empty

**FEN Format Understanding**:

```
rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
|board| |turn| |castling| |en passant| |halfmove| |fullmove|
```

**Example Usage**:

```javascript
import ChessUtil from "@/utils/ChessUtil.js";

// Parse starting position
const board = ChessUtil.parseFen(
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
);

// Access specific squares
const a1 = board[7][0]; // 'R' (white rook)
const e1 = board[7][4]; // 'K' (white king)
const e8 = board[0][4]; // 'k' (black king)
const d4 = board[3][3]; // null (empty square)

// Check piece types
const isPawn = board[6][0] === "P"; // true (white pawn on a2)
const isKnight = board[0][1] === "n"; // true (black knight on b8)
```

**Implementation Details**:

- Handles empty squares (numbers 1-8 in FEN)
- Converts lowercase to uppercase for piece representation
- Maintains board orientation (white perspective)
- Validates FEN string format

---

### `checkPromotion(rank: number, pieceChar: string): boolean`

**Purpose**: Determines if a pawn should be promoted based on its current rank and piece type.

**Parameters**:

- `rank: number` - The current rank (0-7, where 0=rank 8, 7=rank 1)
- `pieceChar: string` - The piece character to check

**Returns**: `boolean` - `true` if the piece should be promoted, `false` otherwise

**Promotion Rules**:

- Only pawns can be promoted
- White pawns promote when reaching rank 0 (rank 8)
- Black pawns promote when reaching rank 7 (rank 1)
- Other pieces never promote

**Example Usage**:

```javascript
import ChessUtil from "@/utils/ChessUtil.js";

// Check white pawn promotion
ChessUtil.checkPromotion(0, "P"); // true (white pawn on rank 8)
ChessUtil.checkPromotion(1, "P"); // false (white pawn on rank 7)
ChessUtil.checkPromotion(0, "R"); // false (rook cannot promote)

// Check black pawn promotion
ChessUtil.checkPromotion(7, "p"); // true (black pawn on rank 1)
ChessUtil.checkPromotion(6, "p"); // false (black pawn on rank 2)
ChessUtil.checkPromotion(7, "q"); // false (queen cannot promote)
```

**Use Cases**:

- Determining when to show promotion popup
- Validating pawn moves
- Game state management

---

## 🔧 Integration Patterns

### Component Usage

```javascript
// In Chessboard.vue
import ChessUtil from "@/utils/ChessUtil.js";

export default {
  computed: {
    boardArray() {
      return ChessUtil.parseFen(this.fen);
    },
  },

  methods: {
    handleSquareClick(rank, file) {
      const piece = this.boardArray[rank][file];

      if (piece && piece.toLowerCase() === "p") {
        // Check if pawn should promote
        if (ChessUtil.checkPromotion(rank, piece)) {
          this.showPromotionPopup();
        }
      }
    },
  },
};
```

### Game Logic Integration

```javascript
// In GameBoard.vue
import ChessUtil from "@/utils/ChessUtil.js";

export default {
  methods: {
    updateBoard(fen) {
      // Parse FEN to get board state
      this.boardArray = ChessUtil.parseFen(fen);

      // Check for promotion opportunities
      this.checkForPromotions();
    },

    checkForPromotions() {
      // Scan board for pawns that can promote
      for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
          const piece = this.boardArray[rank][file];
          if (piece && ChessUtil.checkPromotion(rank, piece)) {
            this.handlePromotion(rank, file, piece);
          }
        }
      }
    },
  },
};
```

---

## 🧠 Design Principles

### Functional Programming Approach

- **Pure Functions**: No side effects, same input always produces same output
- **Immutability**: Functions don't modify input parameters
- **Stateless**: No internal state or instance variables
- **Composable**: Functions can be combined and chained

### Performance Considerations

- **Efficient Parsing**: Optimized FEN parsing algorithm
- **Memory Management**: Minimal object creation
- **Caching Ready**: Functions are cacheable and memoizable

### Error Handling

- **Graceful Degradation**: Handles malformed FEN strings
- **Validation**: Basic format validation
- **Fallbacks**: Returns sensible defaults for invalid input

---

## 🚀 Future Enhancements

### Planned Utility Functions

```javascript
// FEN Generation
static generateFen(board: string[][], turn: string, castling: string, enPassant: string, halfMove: number, fullMove: number): string

// Move Validation
static isValidMove(board: string[][], from: Position, to: Position, piece: string): boolean

// Game State Analysis
static isCheck(board: string[][], color: string): boolean
static isCheckmate(board: string[][], color: string): boolean
static isStalemate(board: string[][], color: string): boolean

// Piece Movement
static getValidMoves(board: string[][], position: Position): Position[]
static getPieceValue(piece: string): number

// Board Analysis
static countPieces(board: string[][], color: string): { [piece: string]: number }
static getMaterialAdvantage(board: string[][], color: string): number
```

### Performance Optimizations

- **Web Workers**: Move calculation in background threads
- **Bitboards**: Efficient board representation for complex calculations
- **Opening Book**: Pre-calculated opening moves
- **Endgame Tables**: Optimized endgame play

---

## 🔗 Related

### Used By

- **Chessboard.vue**: Board rendering and piece positioning
- **GameBoard.vue**: Game state management and validation
- **CapturedPieces.vue**: Piece counting and display
- **GameStatus.vue**: Game state analysis

### Integrates With

- **ChessApi.js**: Backend move validation
- **ChessSocket.js**: Real-time game updates
- **Vue Components**: UI state management
- **Router**: Game state persistence

---

## 📚 Additional Resources

### FEN Notation

- [FEN Specification](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
- [Chess Position Analysis](https://lichess.org/analysis)
- [FEN Validator](https://lichess.org/editor)

### Chess Programming

- [Chess Programming Wiki](https://www.chessprogramming.org/)
- [Bitboard Tutorial](https://www.chessprogramming.org/Bitboards)
- [Move Generation](https://www.chessprogramming.org/Move_Generation)

### Performance Optimization

- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Memoization](https://en.wikipedia.org/wiki/Memoization)
- [Algorithm Complexity](https://en.wikipedia.org/wiki/Time_complexity)
