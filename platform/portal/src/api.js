import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Services
export const getServices = () => api.get('/services')
export const createService = (data) => api.post('/services', data)

// Namespaces
export const getNamespaces = () => api.get('/namespaces')

export default api