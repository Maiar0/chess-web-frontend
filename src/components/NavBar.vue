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
  height: 8vh;
  width: 100%;
  left: 0;
  z-index: 1000;
}

.navbar_buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button {
  background-color: darkslategrey;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
}

.navbar_title {
  width: 25%;
  font-size: 2.0em;
  text-align: left;
  padding-left: 1rem;
  margin: 0;
}
</style>
