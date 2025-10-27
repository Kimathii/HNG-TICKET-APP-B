import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from './useToast'

const user = ref(null)
const loading = ref(true)

export function useAuth() {
  const router = useRouter()
  const { showToast } = useToast()

  const isAuthenticated = computed(() => !!user.value)

  const initAuth = () => {
    const token = localStorage.getItem('ticketapp_session')
    if (token) {
      try {
        user.value = JSON.parse(token)
      } catch (e) {
        localStorage.removeItem('ticketapp_session')
      }
    }
    loading.value = false
  }

  const login = (email, password) => {
    if (email && password.length >= 6) {
      const userData = { email, token: Date.now().toString() }
      localStorage.setItem('ticketapp_session', JSON.stringify(userData))
      user.value = userData
      showToast('Welcome back!', 'success')
      return true
    }
    showToast('Invalid email or password.', 'error')
    return false
  }

  const signup = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      showToast('Passwords do not match.', 'error')
      return false
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error')
      return false
    }
    const userData = { email, token: Date.now().toString() }
    localStorage.setItem('ticketapp_session', JSON.stringify(userData))
    user.value = userData
    showToast('Account created successfully!', 'success')
    return true
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    user.value = null
    showToast('Logged out successfully.', 'info')
    router.push('/')
  }

  return {
    user,
    loading,
    isAuthenticated,
    initAuth,
    login,
    signup,
    logout
  }
}