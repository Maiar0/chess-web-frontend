<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="message-popup"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.message-popup {
  position: fixed;
  bottom: 1rem; /* Tailwind's bottom-4 = 1rem */
  left: 50%;
  transform: translateX(-50%);
  background-color: #dc2626; /* Tailwind's red-600 */
  color: white;
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  border-radius: 0.5rem; /* rounded */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
  z-index: 50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
