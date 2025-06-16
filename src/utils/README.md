
# 📂 `utils/` – Utility Functions

This folder is intended to hold standalone utility modules that provide reusable logic outside the scope of UI components or views.

---

## 📄 ChessUtil.js

Contains helper methods for FEN parsing and chess-specific rule logic.

### ✅ Exported Static Methods

#### `parseFen(fen: string): string[][]`
- Converts a FEN (Forsyth-Edwards Notation) string into a 2D board array.
- Each cell contains:
  - A piece character (`'P'`, `'n'`, `'k'`, etc.), or
  - `null` if the square is empty.
- Board layout is flipped vertically so that `board[0]` is rank 8 and `board[7]` is rank 1.

**Example:**
```js
ChessUtil.parseFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
````

---

#### `checkPromotion(rank: number, pieceChar: string): boolean`

* Determines if a pawn should be promoted based on its rank.
* Returns `true` if the piece is a pawn (`'p'` or `'P'`) and is on rank 0 or 7.

**Example:**

```js
ChessUtil.checkPromotion(7, 'p'); // true
```

---

## 🧠 Design Notes

* Functions are stateless and static for ease of access.
* Useful in rendering logic (`Chessboard.vue`) or game validation logic (`GameBoard.vue`).
* Can be expanded with:

  * FEN generation
  * Move legality checks
  * Piece value evaluations

---

## 🔗 Related

* Used in components that require board parsing or pawn promotion checks.
* Complements game logic handled via `ChessApi.js`.

---
