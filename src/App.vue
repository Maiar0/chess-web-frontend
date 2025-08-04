<template>
  <div id="app">
    <NavBar />
    <main class="content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>
<style>
.content {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  /* center the bleed */
  padding: 0;
  padding-top: 8vh;
  /* Add top padding to account for fixed navbar */
  min-height: calc(100vh - 8vh);
  /* Ensure content takes remaining viewport height */
}
</style>