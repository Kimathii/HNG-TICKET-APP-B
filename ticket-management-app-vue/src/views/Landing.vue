<template>
  <div class="page">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="circle circle-large"></div>
      <div class="circle circle-small"></div>
      
      <div class="hero-content">
        <h1 class="hero-title">Streamline Your Workflow</h1>
        <p class="hero-subtitle">
          The modern ticket management system designed for teams who value simplicity and efficiency
        </p>
        <div class="hero-buttons">
          <button @click="$router.push('/login')" class="btn-hero-white">
            Login
          </button>
          <button @click="$router.push('/signup')" class="btn-hero-yellow">
            Get Started
          </button>
        </div>
      </div>
      
      <!-- Wavy Bottom -->
      <div class="wave-container">
        <svg viewBox="0 0 1440 120" class="wave-svg">
          <path
            fill="#ffffff"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="features-title">Why Choose TicketFlow?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎯</div>
            <h3 class="feature-heading">Easy to Use</h3>
            <p class="feature-text">
              Intuitive interface that gets your team up and running in minutes
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-heading">Lightning Fast</h3>
            <p class="feature-text">
              Real-time updates and instant notifications keep everyone in sync
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3 class="feature-heading">Secure & Reliable</h3>
            <p class="feature-text">
              Your data is protected with industry-standard security measures
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Landing',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.hero {
  background: linear-gradient(to bottom right, #3b82f6, #9333ea);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  pointer-events: none;
}

.circle-large {
  width: 24rem;
  height: 24rem;
  background-color: #fbbf24;
  top: -5rem;
  right: -5rem;
}

.circle-small {
  width: 16rem;
  height: 16rem;
  background-color: #ec4899;
  bottom: 2.5rem;
  left: 2.5rem;
}

.hero-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 6rem 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-hero-white {
  background-color: #ffffff;
  color: #2563eb;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.btn-hero-white:hover {
  background-color: #f3f4f6;
}

.btn-hero-yellow {
  background-color: #fbbf24;
  color: #111827;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.btn-hero-yellow:hover {
  background-color: #f59e0b;
}

.wave-container {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.wave-svg {
  width: 100%;
  height: auto;
  display: block;
}

.features-section {
  padding: 5rem 0;
  background-color: #f9fafb;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
}

.features-title {
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  cursor: pointer;
}

.feature-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.feature-text {
  color: #6b7280;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>