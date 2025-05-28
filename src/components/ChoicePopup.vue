<template>
  <div class="popup-overlay">
    <div class="popup-box">
      <p class="popup-message">{{ message }}</p>
      <div class="popup-choices">
        <button
          v-for="(choice, index) in choices"
          :key="index"
          class="popup-button"
          @click="select(choice)"
        >
          {{ choice }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  choices: { type: Array, required: true }
})

const emit = defineEmits(['select'])

function select(choice) {
  emit('select', choice)
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  min-width: 200px;
}

.popup-message {
  margin-bottom: 1rem;
  font-weight: bold;
}

.popup-choices {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.popup-button {
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-button:hover {
  background: #555;
}
</style>
