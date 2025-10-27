import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Route guard for authentication
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ticketapp_session')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.name === 'Login' || to.name === 'Signup') && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router