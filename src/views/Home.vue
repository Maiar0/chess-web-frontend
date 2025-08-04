<!-- File: src/views/Home.vue -->
<template>
    <div class="bg-layer"></div>
    <div class="content">
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
        image: '/chesssprites/wk.svg',
        route: '/Chess'
    }
])
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
    padding: var(--spacing-xl);
    color: var(--text-primary);
}

.home-container {
    max-width: 1200px;
    width: 100%;
    text-align: center;
}

.home-container h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 var(--spacing-xl);
    background: linear-gradient(135deg, #2c3e50, #34495e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.game-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    max-width: 900px;
    margin: 0 auto;
}

.game-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(20px);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 8px 32px rgba(17, 153, 142, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    min-height: 280px;
    max-width: 340px;
}

.game-card:hover {
    transform: translateY(-16px) scale(1.03);
    box-shadow: 0 24px 60px rgba(17, 153, 142, 0.25);
    border-color: rgba(17, 153, 142, 0.4);
}

.game-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #11998e, #38ef7d, #11998e);
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}

.game-image {
    width: 100%;
    height: 180px;
    object-fit: contain;
    padding: var(--spacing-lg);
    background: linear-gradient(135deg, rgba(17, 153, 142, 0.05), rgba(56, 239, 125, 0.05));
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.game-image::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(17, 153, 142, 0.3), transparent);
}

.game-image img {
    max-width: 70%;
    max-height: 70%;
    filter: drop-shadow(0 4px 8px rgba(17, 153, 142, 0.3));
    transition: transform 0.3s ease;
}

.game-card:hover .game-image img {
    transform: scale(1.1);
}

.game-info {
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--spacing-md);
    background: linear-gradient(135deg, rgba(17, 153, 142, 0.08), rgba(56, 239, 125, 0.08));
    justify-content: center;
    position: relative;
}

.game-info::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(17, 153, 142, 0.2), transparent);
}

.game-name {
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #11998e, #38ef7d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    letter-spacing: -0.5px;
}

.game-description {
    font-size: 1.05rem;
    line-height: 1.6;
    color: #4a5568;
    flex: 1;
    text-align: center;
    font-weight: 500;
    margin: 0;
    opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content {
        padding: var(--spacing-lg);
    }

    .home-container h1 {
        font-size: 2rem;
    }

    .game-list {
        grid-template-columns: 1fr;
        max-width: 400px;
    }
}

@media (max-width: 480px) {
    .home-container h1 {
        font-size: 1.75rem;
    }

    .game-card {
        margin: 0 var(--spacing-sm);
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

.home-container {
    animation: fadeInUp 0.6s ease-out;
}
</style>
