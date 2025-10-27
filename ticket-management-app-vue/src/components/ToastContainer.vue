<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { useToast } from '../composables/useToast'

export default {
  name: 'ToastContainer',
  setup() {
    const { toasts } = useToast()
    return { toasts }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-weight: 500;
  max-width: 300px;
}

.toast-success {
  background-color: #10b981;
}

.toast-error {
  background-color: #ef4444;
}

.toast-info {
  background-color: #3b82f6;
}
</style>