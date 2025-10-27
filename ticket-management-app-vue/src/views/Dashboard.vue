<template>
  <div class="page">
    <Navbar />
    <div class="dashboard-container">
      <div class="container">
        <h1 class="page-title">Dashboard</h1>
        
        <div class="stats-grid">
          <div class="stat-card">
            <h3 class="stat-label">Total Tickets</h3>
            <p class="stat-value stat-blue">{{ stats.total }}</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-label">Open Tickets</h3>
            <p class="stat-value stat-green">{{ stats.open }}</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-label">In Progress</h3>
            <p class="stat-value stat-amber">{{ stats.inProgress }}</p>
          </div>
        </div>

        <div class="action-grid">
          <div class="stat-card">
            <h3 class="stat-label">Resolved Tickets</h3>
            <p class="stat-value stat-gray">{{ stats.closed }}</p>
          </div>
          <div class="action-card">
            <h3 class="action-label">Quick Actions</h3>
            <router-link to="/tickets" class="btn-action">
              Manage Tickets
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useTickets } from '../composables/useTickets'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const { loadTickets, getTicketStats } = useTickets()

    onMounted(() => {
      loadTickets()
    })

    const stats = computed(() => getTicketStats())

    return {
      stats
    }
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

.dashboard-container {
  flex-grow: 1;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: bold;
  margin: 0;
}

.stat-blue {
  color: #2563eb;
}

.stat-green {
  color: #10b981;
}

.stat-amber {
  color: #f59e0b;
}

.stat-gray {
  color: #6b7280;
}

.action-card {
  background: linear-gradient(to bottom right, #3b82f6, #9333ea);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.action-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.btn-action {
  display: inline-block;
  background-color: #ffffff;
  color: #2563eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-action:hover {
  background-color: #f3f4f6;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }
}
</style>