<template>
    <div class="bg-layer"></div>
    <div class="content">
        <div class="tic-container">
            <h1>Play Tic-Tac-Toe</h1>
            <h1>Choose an option below:</h1>
            <div class="new-game-section">
                <button @click="onNewGame">Play a Friend</button>
                <button @click="onNewGame">Play against AI</button>
            </div>
            <div class="resume-section">
                <input v-model="gameId" placeholder="Enter Game ID" />
                <button @click="onResumeGame">Resume Your Game</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import Api from '../api/Api'

onMounted(() => {
    const playerKey = 'chess-player-uuid'
    let playerId = localStorage.getItem(playerKey)

    if (!playerId) {
        playerId = uuidv4()
        localStorage.setItem(playerKey, playerId)
        console.log('New player UUID generated:', playerId)
    } else {
        console.log('Existing player UUID found:', playerId)
    }
})

const gameId = ref('')
const router = useRouter()
const api = new Api();

async function onNewGame(isAi = false) {
    let playerId = localStorage.getItem('chess-player-uuid')
    try {
        const result = await api.fetchJSON('/api/v1/tictactoe/create', {
            method: 'POST',
            body: JSON.stringify({
                playerId: playerId,
                isAi: isAi//put this on backend call
            })
        })
        console.log('result', result)
        gameId.value = result.gameId;
        console.log('New game created with ID:', gameId.value);
        router.push(`/tictactoe/${gameId.value}`);
    } catch (error) {
        console.error('Error creating new game:', error);
    }
}

function onResumeGame() {
    if (!gameId.value) {
        alert('Please enter a Game ID to resume.');
        return;
    }
    if (gameId.value.trim()) {
        router.push(`/tictactoe/${gameId.value.trim()}`);
    }
}
</script>

<style scoped>
/* Background Layer */
.bg-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    z-index: -1;
}

/* Main Content Container */
.content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 8vh);
    /* Account for navbar */
    padding: var(--spacing-xl);
    color: var(--text-primary);
}

/* Chess Container */
.chess-coiner {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    padding: var(--spacing-2xl);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    max-width: 500px;
    width: 100%;
    text-align: center;
}

/* Typography */
.tic-container h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #2c3e50, #34495e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.tic-container h1:last-of-type {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
}

/* Buttons */
.tic-container button {
    width: 100%;
    height: 50px;
    padding: var(--spacing-lg) var(--spacing-xl);
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, #11998e, #0d7a6b);
    color: white;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);
    position: relative;
    overflow: hidden;
}

.tic-container button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.tic-container button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
}

.tic-container button:hover::before {
    left: 100%;
}

.tic-container button:active {
    transform: translateY(0);
}

/* New Game Section */
.new-game-section {
    display: flex;
    gap: var(--spacing-md);
    width: 100%;
    max-width: 600px;
    margin-bottom: var(--spacing-xl);
}

.new-game-section button {
    flex: 1;
    max-width: none;
}

/* Resume Section */
.resume-section {
    display: flex;
    gap: var(--spacing-md);
    width: 100%;
    max-width: 600px;
}

.resume-section input {
    flex: 1;
    max-width: none;
}

.resume-section button {
    flex: 1;
    max-width: none;
}

/* Input Field */
.tic-container input {
    width: 100%;
    height: 50px;
    padding: var(--spacing-lg);
    font-size: 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.9);
    color: var(--text-primary);
    transition: all var(--transition-normal);
    text-align: center;
}

.tic-container input:focus {
    outline: none;
    border-color: #11998e;
    box-shadow: 0 0 0 3px rgba(17, 153, 142, 0.1);
    background: white;
}

.tic-container input::placeholder {
    color: var(--text-muted);
}

/* Responsive Design */
@media (max-width: 768px) {
    .content {
        padding: var(--spacing-lg);
    }

    .tic-container {
        padding: var(--spacing-xl);
        margin: var(--spacing-lg);
    }

    .tic-container h1 {
        font-size: 2rem;
    }

    .tic-container h1:last-of-type {
        font-size: 1.25rem;
    }

    .new-game-section,
    .resume-section {
        flex-direction: column;
        max-width: 300px;
    }
}

@media (max-width: 480px) {
    .tic-container {
        padding: var(--spacing-lg);
    }

    .tic-container h1 {
        font-size: 1.75rem;
    }

    .tic-container button {
        padding: var(--spacing-md) var(--spacing-lg);
        font-size: 1rem;
    }
}

/* Animation for page load   */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.tic-container {
    animation: fadeInUp 0.6s ease-out;
}
</style>