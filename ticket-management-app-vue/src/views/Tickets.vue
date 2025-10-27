<template>
  <div class="page">
    <Navbar />
    <div class="tickets-container">
      <div class="container">
        <div class="header">
          <h1 class="page-title">Ticket Management</h1>
          <button @click="toggleForm" class="btn-create">
            {{ showForm ? 'Cancel' : 'Create Ticket' }}
          </button>
        </div>

        <!-- Form -->
        <div v-if="showForm" class="form-card">
          <h2 class="form-title">
            {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
          </h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="form-label">
                Title <span class="required">*</span>
              </label>
              <input
                type="text"
                v-model="formData.title"
                class="form-input"
                placeholder="Enter ticket title"
              />
              <p v-if="errors.title" class="error-text">{{ errors.title }}</p>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">
                  Status <span class="required">*</span>
                </label>
                <select v-model="formData.status" class="form-select">
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                <p v-if="errors.status" class="error-text">{{ errors.status }}</p>
              </div>

              <div class="form-group">
                <label class="form-label">Priority</label>
                <select v-model="formData.priority" class="form-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea
                v-model="formData.description"
                class="form-textarea"
                rows="4"
                placeholder="Enter ticket description (max 500 characters)"
                maxlength="500"
              ></textarea>
              <p class="char-count">
                {{ formData.description.length }}/500 characters
              </p>
              <p v-if="errors.description" class="error-text">{{ errors.description }}</p>
            </div>

            <button type="submit" class="btn-submit">
              {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
            </button>
          </form>
        </div>

        <!-- Tickets List -->
        <div class="tickets-grid">
          <div v-if="tickets.length === 0" class="empty-state">
            <p class="empty-text">No tickets yet. Create your first ticket!</p>
          </div>
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="handleEdit"
            @delete="handleDelete"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useTickets } from '../composables/useTickets'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import TicketCard from '../components/TicketCard.vue'

export default {
  name: 'Tickets',
  components: {
    Navbar,
    Footer,
    TicketCard
  },
  setup() {
    const { tickets, loadTickets, addTicket, updateTicket, deleteTicket } = useTickets()
    
    const showForm = ref(false)
    const editingTicket = ref(null)
    const formData = reactive({
      title: '',
      status: 'open',
      description: '',
      priority: 'medium'
    })
    const errors = ref({})

    onMounted(() => {
      loadTickets()
    })

    const resetForm = () => {
      formData.title = ''
      formData.status = 'open'
      formData.description = ''
      formData.priority = 'medium'
      errors.value = {}
      editingTicket.value = null
    }

    const toggleForm = () => {
      showForm.value = !showForm.value
      if (!showForm.value) {
        resetForm()
      }
    }

    const validate = () => {
      const newErrors = {}
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required'
      }
      if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
        newErrors.status = 'Invalid status'
      }
      if (formData.description.length > 500) {
        newErrors.description = 'Description must be less than 500 characters'
      }
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (validate()) {
        if (editingTicket.value) {
          updateTicket(editingTicket.value.id, { ...formData })
        } else {
          addTicket({ ...formData })
        }
        resetForm()
        showForm.value = false
      }
    }

    const handleEdit = (ticket) => {
      editingTicket.value = ticket
      formData.title = ticket.title
      formData.status = ticket.status
      formData.description = ticket.description || ''
      formData.priority = ticket.priority || 'medium'
      showForm.value = true
    }

    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        deleteTicket(id)
      }
    }

    return {
      tickets,
      showForm,
      editingTicket,
      formData,
      errors,
      toggleForm,
      handleSubmit,
      handleEdit,
      handleDelete
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

.tickets-container {
  flex-grow: 1;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.btn-create {
  background-color: #2563eb;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-create:hover {
  background-color: #1d4ed8;
}

.form-card {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
  resize: vertical;
}

.char-count {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
  transition: background-color 0.2s;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 0;
}

.empty-text {
  color: #6b7280;
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.75rem;
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-create {
    width: 100%;
  }
}
</style>