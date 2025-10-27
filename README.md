# HNG-TICKET-APP-B
STAGE 2B

# TicketFlow - Vue.js Ticket Management Application

A modern, full-featured ticket management system built with Vue 3 Composition API. This application demonstrates production-ready CRUD operations, authentication simulation, responsive design, and accessible UI patterns.

![Vue](https://img.shields.io/badge/Vue.js-3.3+-4FC08D?style=flat&logo=vue.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue%20Router-4.2+-4FC08D?style=flat&logo=vue.js&logoColor=white)

---

## 🎯 Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete tickets
- ✅ **Authentication System** - Login and Signup with validation
- ✅ **Protected Routes** - Secure dashboard and ticket management pages with Vue Router guards
- ✅ **Real-time Statistics** - Dashboard with computed ticket metrics
- ✅ **Status Management** - Track tickets through open, in progress, and closed states
- ✅ **Priority System** - Assign low, medium, or high priority to tickets
- ✅ **Form Validation** - Comprehensive client-side validation with error messages
- ✅ **Toast Notifications** - Custom Vue-based toast system for user feedback
- ✅ **Responsive Design** - Mobile-first approach with tablet and desktop layouts
- ✅ **Persistent Storage** - All data stored in localStorage with same keys as React version

### Design Features
- Modern gradient hero sections with SVG wave backgrounds
- Decorative circles for visual appeal
- Fully responsive across all device sizes
- Accessible with semantic HTML and proper form labels
- Smooth hover effects and transitions
- Color-coded status badges for quick visual identification
- Scoped component styles to prevent conflicts

---

## Tech Stack

### Core Technologies
- **Vue 3.3+** - Progressive JavaScript framework with Composition API
- **Vue Router 4.2+** - Official router for Vue.js with hash history
- **Vite** - Next-generation frontend tooling
- **JavaScript ES6+** - Modern JavaScript features
- **Composables** - Reusable stateful logic (Vue's equivalent to React hooks)
- **localStorage API** - Browser storage for data persistence

### Key Patterns
- **Composition API** - Modern Vue 3 approach for logic composition
- **Composables Pattern** - Shared stateful logic across components
- **Single File Components** - `.vue` files with template, script, and styles
- **Reactive State** - Vue's reactivity system with `ref()` and `reactive()`
- **Scoped CSS** - Component-scoped styles without conflicts

---

##  Project Structure

```
ticket-management-app-vue/
├── public/
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable components
│   │   ├── Footer.vue
│   │   ├── Navbar.vue
│   │   ├── TicketCard.vue
│   │   └── ToastContainer.vue
│   ├── composables/         # Reusable logic
│   │   ├── useAuth.js       # Authentication logic
│   │   ├── useTickets.js    # Ticket CRUD logic
│   │   └── useToast.js      # Toast notification logic
│   ├── router/              # Vue Router configuration
│   │   └── index.js
│   ├── views/               # Page components
│   │   ├── Dashboard.vue
│   │   ├── Landing.vue
│   │   ├── Login.vue
│   │   ├── Signup.vue
│   │   └── Tickets.vue
│   ├── App.vue              # Root component
│   ├── main.js              # Application entry point
│   └── style.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### Architecture Layers

**Composables Layer** (Business Logic):
- `useAuth` - Authentication state and operations
- `useTickets` - Ticket CRUD and statistics
- `useToast` - Global toast notifications

**Router Layer**:
- Route definitions with hash-based history
- Authentication guards for protected routes
- Automatic redirects based on auth state

**View Layer** (Pages):
- Landing - Public homepage
- Login/Signup - Authentication pages
- Dashboard - Protected statistics page
- Tickets - Protected CRUD interface

**Component Layer** (Reusable UI):
- Navbar - Navigation with auth-based rendering
- Footer - Site footer
- TicketCard - Individual ticket display
- ToastContainer - Toast notification display

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** version 16 or higher
- **npm** or **yarn** package manager

### Installation

1. **Create the project**
   ```bash
   npm create vue@latest ticket-management-app-vue
   ```
   
   Select these options:
   - ❌ TypeScript
   - ✅ Vue Router - **Yes**
   - ❌ Pinia
   - ❌ Vitest
   - ❌ ESLint (optional)

2. **Navigate and install**
   ```bash
   cd ticket-management-app-vue
   npm install
   ```

3. **Create folder structure**
   ```bash
   mkdir src/composables
   mkdir src/views
   ```

4. **Copy all source files**
   - Copy composables to `src/composables/`
   - Copy components to `src/components/`
   - Copy views to `src/views/`
   - Update `src/router/index.js`
   - Update `src/App.vue`
   - Update `src/main.js`
   - Update `src/style.css`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173/`

---

## 🔐 Authentication System

### How It Works

The application simulates authentication using **localStorage** without a backend server:

1. **Session Storage**: User credentials stored in localStorage with key `ticketapp_session`
2. **Token Generation**: Timestamp-based token created on login/signup
3. **Router Guards**: Vue Router `beforeEach` guard checks for token
4. **Auto-redirect**: Protected routes redirect to login if no token exists
5. **Reactive State**: Auth state managed in composable with `ref()`

### Demo Credentials

```
Email: demo@user.com
Password: 123456
```

**Or** create any new account with:
- Valid email format (e.g., `user@example.com`)
- Password with at least 6 characters

### Implementation

```javascript
// Router guard in src/router/index.js
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ticketapp_session')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')  // Redirect to login
  } else if ((to.name === 'Login' || to.name === 'Signup') && token) {
    next('/dashboard')  // Already logged in
  } else {
    next()  // Proceed
  }
})
```

---

## 📊 State Management with Composables

### Composables Pattern

Vue 3 uses composables (functions starting with `use`) to share stateful logic:

```javascript
// Singleton pattern - state shared across all components
const user = ref(null)

export function useAuth() {
  // Returns same user ref to all components
  return { user, login, logout, ... }
}
```

### State Structure

#### useAuth Composable
```javascript
{
  user: ref({
    email: string,
    token: string
  } | null),
  loading: ref(boolean),
  isAuthenticated: computed(boolean),
  initAuth: () => void,
  login: (email, password) => boolean,
  signup: (email, password, confirm) => boolean,
  logout: () => void
}
```

#### useTickets Composable
```javascript
{
  tickets: ref([
    {
      id: string,
      title: string,
      status: 'open' | 'in_progress' | 'closed',
      description: string,
      priority: 'low' | 'medium' | 'high'
    }
  ]),
  loadTickets: () => void,
  addTicket: (ticket) => void,
  updateTicket: (id, updates) => void,
  deleteTicket: (id) => void,
  getTicketStats: () => object
}
```

#### useToast Composable
```javascript
{
  toasts: ref([
    { id: number, message: string, type: string }
  ]),
  showToast: (message, type) => void
}
```

### Data Persistence

All tickets and auth data persist in localStorage:

```javascript
// Automatic save on CRUD operations
localStorage.setItem('tickets', JSON.stringify(tickets.value))

// Automatic load on component mount
const stored = localStorage.getItem('tickets')
tickets.value = stored ? JSON.parse(stored) : []
```

---

## 🎨 Design System

### Color Palette

| Color | Usage | Hex Code |
|-------|-------|----------|
| Primary Blue | Buttons, links, accents | `#2563eb` |
| Purple | Hero gradients | `#9333ea` |
| Green | Open status, success | `#10b981` |
| Amber | In Progress status | `#f59e0b` |
| Red | Delete, errors | `#ef4444` |
| Gray | Closed status, text | `#6b7280` |

### Status Color Coding

```vue
<!-- Automatically applied based on status -->
<span :class="`status-${ticket.status}`">
  {{ ticket.status }}
</span>
```

- **Open** → Green background with dark green text
- **In Progress** → Amber background with dark amber text
- **Closed** → Gray background with dark gray text

### Responsive Breakpoints

```css
/* CSS Grid with auto-fit handles responsiveness */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

**Automatic breakpoints**:
- Mobile: Single column (< 640px)
- Tablet: 2 columns (640px - 1024px)
- Desktop: 3 columns (> 1024px)
- Max container: 1440px

---

## ♿ Accessibility Features

### Semantic HTML
- Proper heading hierarchy (`<h1>`, `<h2>`, `<h3>`)
- Form labels associated with inputs via `<label>` tags
- Semantic elements (`<nav>`, `<footer>`, `<section>`)

### Form Accessibility
```vue
<label class="form-label">
  Email <span class="required">*</span>
</label>
<input
  type="email"
  v-model="email"
  class="form-input"
  aria-required="true"
/>
```

### Keyboard Navigation
- All interactive elements keyboard accessible
- Visible focus states with `outline` and `box-shadow`
- Logical tab order

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Status badges use high-contrast combinations
- Error messages in red with sufficient contrast

---

## 🧪 Form Validation

### Validation Rules

#### Login Form
```javascript
const validate = () => {
  const errors = {}
  if (!email.value) errors.email = 'Email is required'
  if (!/\S+@\S+\.\S+/.test(email.value)) errors.email = 'Invalid email format'
  if (!password.value) errors.password = 'Password is required'
  if (password.value.length < 6) errors.password = 'Min 6 characters'
  return Object.keys(errors).length === 0
}
```

#### Ticket Form
- **Title**: Required, non-empty
- **Status**: Required, must be `open`, `in_progress`, or `closed`
- **Description**: Optional, max 500 characters
- **Priority**: Optional, defaults to `medium`

### Error Display

```vue
<input v-model="email" class="form-input" />
<p v-if="errors.email" class="error-text">
  {{ errors.email }}
</p>
```

---

## 🎯 Usage Guide

### Creating Your First Ticket

1. **Authenticate**: Sign up or login
2. **Navigate**: Click "Tickets" in navbar or "Manage Tickets" button
3. **Create**: Click "Create Ticket" button
4. **Fill Form**:
   - Title (required)
   - Status (required)
   - Priority (optional)
   - Description (optional, max 500 chars)
5. **Submit**: Click "Create Ticket"
6. **Confirmation**: Toast notification confirms creation

### Editing a Ticket

1. Find ticket in the grid
2. Click "Edit" button
3. Form appears with pre-filled data
4. Modify fields as needed
5. Click "Update Ticket"
6. Toast notification confirms update

### Deleting a Ticket

1. Click "Delete" button on ticket card
2. Confirm in browser dialog
3. Ticket removed from grid
4. Toast notification confirms deletion

---

## 🔄 Vue Router

### Route Configuration

```javascript
const routes = [
  { path: '/', component: Landing },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }  // Protected
  },
  { 
    path: '/tickets', 
    component: Tickets,
    meta: { requiresAuth: true }  // Protected
  }
]
```

### Navigation

```vue
<!-- Declarative navigation -->
<router-link to="/dashboard">Dashboard</router-link>

<!-- Programmatic navigation -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goToTickets = () => {
  router.push('/tickets')
}
</script>
```

### Hash-Based History

Uses `createWebHashHistory()` for client-side routing without server configuration:

```
https://example.com/#/dashboard
https://
