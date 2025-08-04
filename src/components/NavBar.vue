<template>
  <nav class="navbar">
    <h1 class="navbar_title">
      <img src="/medeving-white.svg" alt="Medeving Logo" width="48" height="48"
        style="vertical-align: middle; margin-right: -0.5em;" />
      DwardDevs.com
    </h1>
    <div class="navbar_buttons">
      <button @click="goHome">Home</button>
      <button @click="goAbout">About</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
  router.push('/');
}
const goAbout = () => {
  router.push('/about');
}
</script>

<style scoped>
.navbar {
  background-color: black;
  color: white;
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 8vh;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar_buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-right: 2rem;
}

.navbar_buttons button {
  background-color: transparent;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.navbar_buttons button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.navbar_title {
  font-size: 1.8em;
  text-align: left;
  padding-left: 1rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
