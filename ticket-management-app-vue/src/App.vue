<template>
  <div id="app">
    <router-view />
    <ToastContainer />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useAuth } from './composables/useAuth'
import ToastContainer from './components/ToastContainer.vue'

export default {
  name: 'App',
  components: {
    ToastContainer
  },
  setup() {
    const { initAuth } = useAuth()
    
    onMounted(() => {
      initAuth()
    })
  }
}
</script>