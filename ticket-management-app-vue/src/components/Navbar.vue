<template>
  <nav class="navbar">
    <div class="navbar-content">
      <h1 class="logo" @click="navigateHome">TicketFlow</h1>
      <div class="nav-links">
        <template v-if="isAuthenticated">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          <router-link to="/tickets" class="nav-link">Tickets</router-link>
          <button @click="handleLogout" class="btn-danger">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/signup" class="btn-primary">Get Started</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuth } from '../composables/useAuth'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const { isAuthenticated, logout } = useAuth()
    const router = useRouter()

    const navigateHome = () => {
      router.push(isAuthenticated.value ? '/dashboard' : '/')
    }

    const handleLogout = () => {
      logout()
    }

    return {
      isAuthenticated,
      navigateHome,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.navbar-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  cursor: pointer;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2563eb;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-danger:hover {
  background-color: #dc2626;
}
</style>