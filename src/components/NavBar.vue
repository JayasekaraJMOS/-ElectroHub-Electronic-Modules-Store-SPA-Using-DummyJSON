<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()
cart.load()

const goToHome = () => {
  router.push('/')
}

const goToCart = () => {
  router.push('/cart')
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <button @click="goToHome" class="flex items-center gap-2 hover:opacity-90 transition">
        <span class="text-3xl">⚡</span>
        <div>
          <h1 class="text-2xl font-bold text-white">ElectroHub</h1>
          <p class="text-blue-100 text-xs">Premium Components Store</p>
        </div>
      </button>

      <button 
        @click="goToCart"
        class="flex items-center gap-2 bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition duration-200 shadow-md"
      >
        <span class="text-xl">🛒</span>
        <span>({{ cart.count }})</span>
      </button>
    </div>
  </nav>
</template>