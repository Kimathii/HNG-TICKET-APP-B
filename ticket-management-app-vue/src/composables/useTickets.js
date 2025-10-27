import { ref } from 'vue'
import { useToast } from './useToast'

const tickets = ref([])

export function useTickets() {
  const { showToast } = useToast()

  const loadTickets = () => {
    const stored = localStorage.getItem('tickets')
    if (stored) {
      try {
        tickets.value = JSON.parse(stored)
      } catch (e) {
        tickets.value = []
      }
    }
  }

  const saveTickets = (newTickets) => {
    tickets.value = newTickets
    localStorage.setItem('tickets', JSON.stringify(newTickets))
  }

  const addTicket = (ticket) => {
    const newTicket = { ...ticket, id: Date.now().toString() }
    const updated = [...tickets.value, newTicket]
    saveTickets(updated)
    showToast('Ticket created successfully!', 'success')
  }

  const updateTicket = (id, updates) => {
    const updated = tickets.value.map(t => 
      t.id === id ? { ...t, ...updates } : t
    )
    saveTickets(updated)
    showToast('Ticket updated successfully!', 'success')
  }

  const deleteTicket = (id) => {
    const updated = tickets.value.filter(t => t.id !== id)
    saveTickets(updated)
    showToast('Ticket deleted successfully!', 'success')
  }

  const getTicketStats = () => {
    return {
      total: tickets.value.length,
      open: tickets.value.filter(t => t.status === 'open').length,
      inProgress: tickets.value.filter(t => t.status === 'in_progress').length,
      closed: tickets.value.filter(t => t.status === 'closed').length
    }
  }

  return {
    tickets,
    loadTickets,
    addTicket,
    updateTicket,
    deleteTicket,
    getTicketStats
  }
}