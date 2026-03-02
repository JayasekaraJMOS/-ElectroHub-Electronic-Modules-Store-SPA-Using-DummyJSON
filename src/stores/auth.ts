import { defineStore } from 'pinia'

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  token: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isLoading: false,
    error: '' as string
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user?.username || ''
  },

  actions: {
    async login(username: string, password: string) {
      this.isLoading = true
      this.error = ''

      try {
        const response = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        if (!response.ok) {
          throw new Error('Invalid credentials')
        }

        const data = await response.json()
        
        this.user = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          token: data.token
        }

        // Store token in localStorage
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        return true
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Login failed'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    },

    loadSavedAuth() {
      const saved = localStorage.getItem('user')
      const token = localStorage.getItem('auth_token')

      if (saved && token) {
        try {
          this.user = JSON.parse(saved)
        } catch {
          this.logout()
        }
      }
    }
  }
})
