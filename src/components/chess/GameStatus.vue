<template>
  <div class="game-status">
    <div>
      <p><strong>Game ID:</strong> {{ gameId }}</p>
      <p><strong>Turn:</strong> {{ activeColor === 'w' ? 'White' : 'Black' }}</p>
    </div>
    <div>
      <p><strong>Move Counter:</strong> {{ fullMove }}</p>
      <p><strong>Half-Move Counter:</strong> {{ halfMove }}</p>
    </div>
    <div>
      <p><strong>In Check:</strong> {{ inCheck }}</p>
    </div>
  </div>
  <div class="actions"><button v-for="(btn, i) in buttons" :key="i" @click="btn.action()">
      {{ btn.label }}
    </button></div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  gameId: { type: String, required: true },
  activeColor: { type: String, required: true }, // 'w' or 'b'
  fullMove: { type: String, required: true },
  halfMove: { type: String, required: true },
  inCheck: { type: Boolean, required: true },
  buttons: { type: Array, required: true }
})

</script>

<style scoped>
.game-status {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  margin-bottom: var(--spacing-lg);
  width: 100%;
  max-width: 1200px;
}

.game-status>div {
  flex: 1;
  min-width: 0;
  max-width: fit-content;
  text-align: center;
}

.game-status p {
  margin: var(--spacing-xs) 0;
  line-height: 1.5;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
}

.game-status strong {
  color: #11998e;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Actions section */
.actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
  flex-wrap: wrap;
}

.actions button {
  background: linear-gradient(135deg, #11998e, #0d7a6b);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);
  position: relative;
  overflow: hidden;
}

.actions button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(17, 153, 142, 0.4);
}

.actions button:hover::before {
  left: 100%;
}

.actions button:active {
  transform: translateY(0);
}

/* Responsive design */
@media (max-width: 768px) {
  .game-status {
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
  }

  .game-status>div {
    text-align: left;
  }

  .actions {
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .actions button {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: 0.85rem;
  }
}

@media (max-width: 600px) {
  .game-status {
    order: 4;
    margin-left: 0;
    margin-bottom: var(--spacing-md);
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .actions button {
    width: 100%;
    max-width: 200px;
  }
}

/* Animation for status updates */
@keyframes statusUpdate {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

.game-status {
  animation: statusUpdate 0.3s ease-out;
}
</style>