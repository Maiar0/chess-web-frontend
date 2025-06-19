<template>
  <div class="about-page">
    <h1>About This Project</h1>
    <p>
      This is a web-based chess application built using Vue.js for the frontend and Express.js for the backend.
      It supports both solo and multiplayer gameplay, board state persistence using FEN notation, and features
      a custom-built move validation engine. The project showcases modular full-stack architecture, real-time interactions,
      and thoughtful UI design for an intuitive gameplay experience.
    </p>
    <p>
      You can view the full source code and ongoing development on GitHub:
      <a href="https://github.com/Maiar0" target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </p>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.about-page h1 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about-page p {
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-page a {
  color: blue;
  text-decoration: none;
}
</style>
