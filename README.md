
# ♟️ Chess Web Frontend

A modern, responsive web-based chess game built using Vue 3, Vue Router, and Vite. Supports online multiplayer gameplay via WebSockets and interaction with a custom backend API.

---

## 🚀 Features

- 🎮 Play chess online with friends or against an AI
- ♻️ Real-time multiplayer via Socket.IO
- 👥 Session-aware player identity via UUID
- 📡 API-integrated move validation and game state management
- 🎨 Dark/light theme responsive styling
- 🔁 Game routing with unique `gameId` paths

---

## 🛠️ Tech Stack

- **Vue 3** - Reactive frontend framework
- **Vue Router** - Page routing with game-specific paths
- **Vite** - Lightning-fast dev and build tool
- **Socket.IO Client** - Real-time event handling
- **Custom Chess API** - Backend communication abstraction

---

## 📁 Project Structure

```

.
├── public/                # Static assets
├── src/
│   ├── components/        # Vue components (not included in snapshot)
│   ├── views/             # Routed pages: Home.vue, Chess.vue, GameBoard.vue, About.vue
│   ├── ChessApi.js        # Game API class wrapper
│   ├── ChessSocket.js     # Socket.IO connection setup
│   ├── router/            # Vue Router config (index.js)
│   └── App.vue            # Main App component
├── style.css              # Global styling
├── main.js                # Vue entry point
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts

````

---

## 📦 Installation

```bash
git clone https://github.com/your-username/chess-web-frontend.git
cd chess-web-frontend
npm install
````

---

## 🧪 Development

To run the dev server with hot reload:

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

> Make sure your backend API and Socket.IO server are running and accessible. Use `.env` file for:

```env
VITE_API_URL=http://localhost:5000/api/chess
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🔨 Build

```bash
npm run build
```

Preview a production build locally:

```bash
npm run preview
```

---

## 🧠 Developer Notes

* Each user is tracked using a persistent UUID stored in `localStorage`.
* Routing includes dynamic `:gameId` for multiplayer sessions.
* All API errors are caught and handled with descriptive messages.
* Socket.IO handles connection, disconnection, and ID logging automatically.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Dennis Ward II**
Software Developer
