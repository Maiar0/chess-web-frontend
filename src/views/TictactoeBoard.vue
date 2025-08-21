<template>
    <div>
        <h1>Tic Tac Toe Board</h1>
    </div>
    <div>
        <button @click="ChooseSymbolX">X</button>
        <button @click="ChooseSymbolO">O</button>
    </div>
    <div class='board'>
        <Board :gameState="gameState" @move="onMove" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Board from '../components/tictactoe/board.vue'
import Api from '../api/Api'
import WebSocketClient from '../api/Websocket'

const gameState = ref('');
const api = new Api()
const route = useRoute()
const props = defineProps({
    gameId: {
        type: String,
        required: true
    }
});

onMounted(() => {
    console.log('[onMounted]', props.gameId)
    const socket = new WebSocketClient()
    socket.connect(api.playerId, 'ab12h23')//connect to socket
    initGameState()//get game state
})


async function initGameState() {
    console.log('[initGameState]', props.gameId)
    const result = await api.fetchJSON('/api/v1/tictactoe/state', {
        method: 'POST',
        body: JSON.stringify({
            gameId: props.gameId,
            playerId: api.playerId
        })
    })
    gameState.value = result.game_state
    console.log('gameState', gameState.value)
}
async function onMove(move) {
    console.log('[onMove]', move)
    const result = await api.fetchJSON('/api/v1/tictactoe/move', {
        method: 'POST',
        body: JSON.stringify({
            gameId: props.gameId,
            playerId: api.playerId,
            move: move
        })
    })
    gameState.value = result.game_state
    console.log('gameState', gameState.value)
}
async function ChooseSymbolX() {
    console.log('[ChooseSymbolX]')
    const result = await api.fetchJSON('/api/v1/tictactoe/choose_player', {
        method: 'POST',
        body: JSON.stringify({
            gameId: props.gameId,
            playerId: api.playerId,
            choice: 'x'
        })
    })
    console.log('result', result)
}
async function ChooseSymbolO() {
    console.log('[ChooseSymbolO]')
    const result = await api.fetchJSON('/api/v1/tictactoe/choose_player', {
        method: 'POST',
        body: JSON.stringify({
            gameId: props.gameId,
            playerId: api.playerId,
            choice: 'o'
        })
    })
    console.log('result', result)
}
</script>

<style scoped></style>