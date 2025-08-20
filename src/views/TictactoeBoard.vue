<template>
    <div>
        <h1>Tic Tac Toe Board</h1>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Api from '../api/Api'
import WebSocketClient from '../api/Websocket'
onMounted(() => {
    const route = useRoute()
    const gameId = route.params.gameId
    const api = new Api()
    const socket = new WebSocketClient()
    socket.connect(api.playerId, 'ab12h23')

})

</script>

<style scoped></style>