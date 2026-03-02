import { defineStore } from 'pinia'
import type { Product } from '../types/Product'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Product[]
  }),

  getters: {
    count: (state) => state.items.length,
    total: (state) => state.items.reduce((sum, item) => sum + item.price, 0)
  },

  actions: {
    add(product: Product) {
      this.items.push(product)
      this.save()
    },

    remove(productId: number) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.save()
      }
    },

    clear() {
      this.items = []
      this.save()
    },

    load() {
      const saved = localStorage.getItem('cart')
      if (saved) {
        try {
          this.items = JSON.parse(saved)
        } catch (e) {
          console.error('Failed to load cart:', e)
          this.items = []
        }
      }
    },

    save() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    }
  }
})