<template>
  <div id="app">
    <NavBar />
    <router-view />        <!-- ← the “page” placeholder -->
    <Footer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>
<style> </style>