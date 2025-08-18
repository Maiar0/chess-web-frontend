<template>
  <div class="broken-link-page">
    <div class="bg-layer"></div>
    <div class="content">
      <div class="message-container">
        <h1>Oops!</h1>
        <p>We couldn't reach the server. Please check your connection or try again later.</p>
        <router-link to="/" class="home-button">Go Back Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed
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

/* Main Content */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  color: #333;
  font-family: Arial, sans-serif;
}

.message-container {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(17, 153, 142, 0.15);
  animation: fadeInUp 0.6s ease-out;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #4a5568;
}

.home-button {
  text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, #11998e, #38ef7d);
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.home-button:hover {
  background: linear-gradient(135deg, #38ef7d, #11998e);
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 480px) {
  h1 {
    font-size: 2.2rem;
  }
  p {
    font-size: 1rem;
  }
  .message-container {
    padding: 2rem 1rem;
  }
}

/* Fade In Animation */
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
</style>
