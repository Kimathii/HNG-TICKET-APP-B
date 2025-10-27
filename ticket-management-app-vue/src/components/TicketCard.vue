<template>
  <div class="ticket-card">
    <div class="ticket-header">
      <h3 class="ticket-title">{{ ticket.title }}</h3>
      <span :class="['status-badge', `status-${ticket.status}`]">
        {{ formatStatus(ticket.status) }}
      </span>
    </div>
    
    <p v-if="ticket.description" class="ticket-description">
      {{ ticket.description }}
    </p>
    
    <div class="ticket-meta">
      <span class="priority-text">
        Priority: <strong>{{ ticket.priority || 'medium' }}</strong>
      </span>
    </div>
    
    <div class="ticket-actions">
      <button @click="$emit('edit', ticket)" class="btn-edit">Edit</button>
      <button @click="$emit('delete', ticket.id)" class="btn-delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  methods: {
    formatStatus(status) {
      return status.replace('_', ' ')
    }
  }
}
</script>

<style scoped>
.ticket-card {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.ticket-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.ticket-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
  word-break: break-word;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  white-space: nowrap;
}

.status-open {
  background-color: #d1fae5;
  color: #065f46;
}

.status-in_progress {
  background-color: #fef3c7;
  color: #92400e;
}

.status-closed {
  background-color: #f3f4f6;
  color: #374151;
}

.ticket-description {
  color: #6b7280;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.ticket-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.priority-text {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: capitalize;
}

.ticket-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #ffffff;
}

.btn-edit {
  background-color: #3b82f6;
}

.btn-edit:hover {
  background-color: #2563eb;
}

.btn-delete {
  background-color: #ef4444;
}

.btn-delete:hover {
  background-color: #dc2626;
}
</style>