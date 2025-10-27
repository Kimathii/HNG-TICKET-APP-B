<template>
  <div class="page">
    <Navbar />
    <div class="auth-container">
      <div class="circle circle-blue"></div>
      <div class="circle circle-purple"></div>
      
      <div class="auth-card">
        <h2 class="auth-title">Welcome Back</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input
              type="email"
              v-model="email"
              class="form-input"
              placeholder="demo@user.com"
            />
            <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              v-model="password"
              class="form-input"
              placeholder="••••••"
            />
            <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
          </div>
          <button type="submit" class="btn-submit">Login</button>
        </form>
        <p class="auth-link-text">
          Don't have an account? 
          <router-link to="/signup" class="auth-link">Sign up</router-link>
        </p>
        <div class="demo-credentials">
          <p class="demo-title">Demo Credentials:</p>
          <p class="demo-text">Email: demo@user.com</p>
          <p class="demo-text">Password: 123456</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const router = useRouter()
    const { login } = useAuth()
    
    const email = ref('')
    const password = ref('')
    const errors = ref({})

    const validate = () => {
      const newErrors = {}
      if (!email.value) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        newErrors.email = 'Invalid email format'
      }
      if (!password.value) {
        newErrors.password = 'Password is required'
      } else if (password.value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (validate() && login(email.value, password.value)) {
        router.push('/dashboard')
      }
    }

    return {
      email,
      password,
      errors,
      handleSubmit
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

.auth-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  position: relative;
  overflow: hidden;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.2;
  pointer-events: none;
}

.circle-blue {
  width: 24rem;
  height: 24rem;
  background-color: #bfdbfe;
  top: -10rem;
  left: -10rem;
}

.circle-purple {
  width: 16rem;
  height: 16rem;
  background-color: #ddd6fe;
  bottom: -5rem;
  right: -5rem;
}

.auth-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  max-width: 28rem;
  width: 100%;
  position: relative;
  z-index: 10;
}

.auth-title {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #1f2937;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.error-text {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-submit {
  width: 100%;
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

.auth-link-text {
  text-align: center;
  margin-top: 1rem;
  color: #6b7280;
}

.auth-link {
  color: #2563eb;
  text-decoration: none;
}

.auth-link:hover {
  text-decoration: underline;
}

.demo-credentials {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #dbeafe;
  border-radius: 0.5rem;
}

.demo-title {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.demo-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}
</style>