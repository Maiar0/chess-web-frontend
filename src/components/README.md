# 📂 `src/components/` – Reusable UI Components

This folder houses the reusable, encapsulated components that power the user interface of the Chess Web Frontend. These are used across routed views like `GameBoard.vue`, `Home.vue`, and `Chess.vue`.

---

## 🧱 Component Overview

### 🧩 `Chessboard.vue`
- Core visual and interactive chessboard.
- Handles piece rendering, movement, and highlighting.
- Likely reacts to game state and emits moves to parent view.

---

### 🧩 `CapturedPieces.vue`
- Displays captured pieces for each player.
- Visually separates captured white and black pieces.
- Optional enhancement: sorting by value.

---

### 🧩 `ChoicePopup.vue`
- Modal interface for in-game decision prompts.
- Common use: pawn promotion choice (queen, rook, etc.).
- Accepts props and emits selected values to parent.

---

### 🧩 `GameStatus.vue`
- Displays the current game state (e.g. checkmate, draw, resignation).
- Can be extended to show timers or player names.
- Appears in sync with backend game info.

---

### 🧩 `MessagePopup.vue`
- Handles messages that require acknowledgment (e.g. draw offer, invalid move).
- May include confirm/cancel buttons and dynamic message text.

---

### 🧩 `NavBar.vue`
- Header navigation bar with links to Home, About, or current game.
- Responsive layout with routing links.

---

### 🧩 `Footer.vue`
- Optional branding or author credit footer.
- Basic styling and layout, possibly static.

---

## 🧠 Design Notes

- All components follow the Single File Component (`.vue`) structure.
- Styling is generally scoped inside components or imported from `style.css`.
- Communication with views occurs via `props`, `emit`, or shared state.

---

## 🔗 Related

- Used primarily in `GameBoard.vue`, `Home.vue`, and `Chess.vue` (found in `src/views/`).
- Ties into `ChessApi.js` and `ChessSocket.js` for backend state and real-time events.

---
