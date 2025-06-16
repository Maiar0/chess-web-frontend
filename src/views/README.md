
# 📂 `src/views/` – Routed Views

This folder contains all the Vue components that serve as top-level routed pages in the Chess Web Frontend. These views are registered with Vue Router and correspond to the main sections of the application.

---

## 🧭 File Overview

### `Home.vue`
- **Path:** `/`
- **Purpose:** Acts as the landing page.
- **Functionality:**
  - Offers options to start a new game (against AI or human).
  - Navigates the user to the appropriate game setup or session.

---

### `Chess.vue`
- **Path:** `/Chess`
- **Purpose:** Pre-game setup view for matchmaking.
- **Functionality:**
  - Allows the user to create or join a game session.
  - Displays a game code or link for sharing.
  - Lets the player choose a side (white/black) before the game starts.

---

### `GameBoard.vue`
- **Path:** `/game/:gameId`
- **Purpose:** The main in-game interface.
- **Functionality:**
  - Renders the actual chessboard UI.
  - Handles real-time interactions via Socket.IO.
  - Interfaces with `ChessApi.js` to send moves, resign, offer draws, etc.
  - Displays game state, player info, turn status, and controls.

---

### `About.vue`
- **Path:** `/about`
- **Purpose:** Informational page about the project.
- **Functionality:**
  - Describes the purpose and scope of the app.
  - Includes developer credits and links to GitHub and portfolio.

---

## 📌 Notes

- All views are single-file Vue components.
- The router setup in `src/router/index.js` binds paths to these views.
- Props like `gameId` are passed automatically to views like `GameBoard.vue`.

---

## 🔗 Related

- `src/router/index.js` – Handles route configuration for these views.
- `ChessApi.js` & `ChessSocket.js` – Used primarily in `GameBoard.vue` and `Chess.vue`.

---
