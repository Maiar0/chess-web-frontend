<!-- File: src/views/Home.vue -->
<template>
    <div class="home-container">
        <h1>Available Games</h1>
        <div class="game-list">
            <router-link v-for="(game, index) in games" :key="index" :to="game.route" class="game-card">
                <img :src="game.image" :alt="game.name" class="game-image" />
                <div class="game-info">
                    <h2 class="game-name">{{ game.name }}</h2>
                    <p class="game-description">{{ game.description }}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

/**
 * Each game object now includes a `route` property,
 * which determines the path to navigate when the card is clicked.
 */
const games = ref([
    {
        name: 'Chess',
        description: 'Play a standard game of chess with friends or AI.',
        image: '/public/chesssprites/wk.png',
        route: '/Chess'
    },
    {
        name: 'Game Beta',
        description: 'Challenge a rival in a rapid showdown.',
        image: '/assets/game-beta.jpg',
        route: '/game/beta456'
    },
    {
        name: 'Game Gamma',
        description: 'Blitz game with a ticking clock.',
        image: '/assets/game-gamma.jpg',
        route: '/game/gamma789'
    },
    {
        name: 'Game Delta',
        description: 'Weekly tournament for advanced players.',
        image: '/assets/game-delta.jpg',
        route: '/game/delta012'
    }
])
</script>

<style scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: #ffffff;
}

.home-container h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

.game-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
}

.game-card {
    background-color: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    /* remove underline */
    transition: transform 0.2s, box-shadow 0.2s;
}

.game-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.game-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
    background-color: #333333;
}

.game-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.game-name {
    font-size: 1.25rem;
    margin: 0 0 0.5rem;
    color: #fff;
}

.game-description {
    font-size: 0.9rem;
    line-height: 1.4;
    flex: 1;
    color: #ccc;
}
</style>
