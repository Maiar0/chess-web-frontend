<template>
  <div class="bg-layer"></div>
  <div class="content">
    <div class="about-container">
      <h1>About This Project</h1>
      <div class="about-content">
        <p>
          This is a web-based chess application built using Vue.js for the frontend and Express.js for the backend.
          It supports both solo and multiplayer gameplay, board state persistence using FEN notation, and features
          a custom-built move validation engine. The project showcases modular full-stack architecture, real-time
          interactions,
          and thoughtful UI design for an intuitive gameplay experience.
        </p>
        <p>
          You can view the full source code and ongoing development on GitHub:
          <a href="https://github.com/Maiar0" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

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

.about-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.about-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: var(--spacing-2xl);
  box-shadow: 0 12px 40px rgba(17, 153, 142, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: var(--spacing-lg);
}

.about-container h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 var(--spacing-lg);
  background: linear-gradient(135deg, #2c3e50, #34495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2c3e50;
  margin-bottom: var(--spacing-lg);
  text-align: left;
}

.about-content a {
  color: #11998e;
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-normal);
  border-bottom: 2px solid transparent;
}

.about-content a:hover {
  color: #38ef7d;
  border-bottom-color: #38ef7d;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .content {
    padding: var(--spacing-lg);
  }

  .about-container h1 {
    font-size: 2rem;
  }

  .about-content {
    padding: var(--spacing-xl);
    margin: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .about-container h1 {
    font-size: 1.75rem;
  }

  .about-content {
    padding: var(--spacing-lg);
  }

  .about-content p {
    font-size: 1rem;
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

.about-container {
  animation: fadeInUp 0.6s ease-out;
}
</style>
