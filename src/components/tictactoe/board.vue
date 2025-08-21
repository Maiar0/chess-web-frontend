<template>
    <div class="board-container">
        <h1 class="board-title">Tic Tac Toe</h1>
        <div class="board">
            <div v-for="(row, x) in board" :key="x" class="row">
                <div v-for="(col, y) in row" :key="y" class="col" @click="onClick(x, y)">
                    <span class="cell-content">{{ col }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    gameState: {
        type: String,
        required: true
    }
})
const playerTurn = ref('')
const board = ref([[null, null, null], [null, null, null], [null, null, null]])
const emit = defineEmits(['move'])

// Watch for changes in gameState prop
watch(() => props.gameState, (gameState) => {
    if (!gameState) return
    if (!board.value) return

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board.value[i][j] = gameState[i * 3 + j] || ''
        }
    }
    playerTurn.value = gameState.split('')[9] || 'X'
    console.log('[watch.gameState]', board.value, playerTurn.value)
}, { immediate: true })


function onClick(row, col) {
    console.log('[onClick]', 'row:', row, 'col', col)
    const move = `${playerTurn.value}${row * 3 + col}`
    emit('move', move)
    console.log('[onClick]', move)
}

</script>

<style scoped>
/* Board Container */
.board-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-xl);
}

/* Board Title */
.board-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #2c3e50, #34495e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
}

/* Main Board */
.board {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: var(--spacing-lg);
    box-shadow: 0 12px 40px rgba(17, 153, 142, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    max-width: 400px;
    width: 100%;
}

/* Board Rows */
.row {
    display: contents;
}

/* Individual Cells */
.col {
    aspect-ratio: 1;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border: 2px solid rgba(17, 153, 142, 0.3);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.col:hover {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    border-color: rgba(17, 153, 142, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(17, 153, 142, 0.2);
}

.col:active {
    transform: translateY(0);
}

/* Cell Content (X, O, or empty) */
.cell-content {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    user-select: none;
    transition: all 0.3s ease;
}

/* X styling */
.cell-content:contains('X') {
    color: #e74c3c;
    text-shadow: 0 2px 4px rgba(231, 76, 60, 0.3);
}

/* O styling */
.cell-content:contains('O') {
    color: #3498db;
    text-shadow: 0 2px 4px rgba(52, 152, 219, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
    .board-container {
        padding: var(--spacing-lg);
    }

    .board-title {
        font-size: 2rem;
    }

    .board {
        max-width: 350px;
        padding: var(--spacing-md);
    }

    .cell-content {
        font-size: 2rem;
    }
}

@media (max-width: 480px) {
    .board-title {
        font-size: 1.75rem;
    }

    .board {
        max-width: 300px;
        padding: var(--spacing-sm);
    }

    .cell-content {
        font-size: 1.75rem;
    }
}

/* Animation for page load */
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

.board-container {
    animation: fadeInUp 0.6s ease-out;
}

/* Cell entrance animation */
.col {
    animation: fadeInUp 0.6s ease-out;
    animation-delay: calc(var(--cell-index) * 0.1s);
}

/* Hover effects with smooth transitions */
.col::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transition: left 0.5s;
}

.col:hover::before {
    left: 100%;
}
</style>