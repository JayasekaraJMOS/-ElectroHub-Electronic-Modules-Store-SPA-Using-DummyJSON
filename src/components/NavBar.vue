<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useThemeStore } from '../stores/theme'
import { useSearchStore } from '../stores/search'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()
const theme = useThemeStore()
const search = useSearchStore()

const goToHome = () => router.push('/')
const goToCart = () => router.push('/cart')
const login = () => router.push('/login')
const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#ff6600] text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <!-- Logo -->
      <button @click="goToHome" class="text-2xl font-bold tracking-tight italic shrink-0">
        OnlineStore
      </button>

      <!-- Navigation Links -->
      <nav class="hidden md:flex items-center gap-4 text-sm">
        <a href="#" class="hover:underline">Save on App</a>
        <a href="#" class="hover:underline">Sell</a>
        <a href="#" class="hover:underline">Help</a>
      </nav>

      <!-- Search Bar -->
      <div class="flex-grow max-w-2xl mx-4">
        <div class="flex bg-[var(--card-bg)] dark:bg-gray-800 rounded border border-[var(--border-color)] overflow-hidden">
          <input 
            type="text" 
            v-model="search.query"
            placeholder="Search in OnlineStore"
            class="w-full py-2 px-4 text-sm text-[var(--text-color)] bg-transparent focus:outline-none"
          >
          <button class="bg-gray-100 dark:bg-gray-700 px-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-[#ff6600]">
            🔍
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4 shrink-0">
        <div v-if="!auth.isAuthenticated" class="hidden sm:flex items-center gap-3">
          <button @click="login" class="font-bold hover:underline">LOGIN</button>
          <button @click="router.push('/register')" class="font-bold hover:underline">SIGN UP</button>
        </div>
        <div v-else class="flex items-center gap-3">
          <span class="text-sm font-bold truncate max-w-[100px]">{{ auth.username }}</span>
          <button @click="logout" class="text-xs hover:underline">Logout</button>
        </div>

        <button @click="goToCart" class="relative hover:scale-105 transition">
          <span class="text-2xl">🛒</span>
          <span v-if="cart.count > 0" class="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
            {{ cart.count }}
          </span>
        </button>

        <button @click="theme.toggleDarkMode" class="p-1 hover:bg-white/10 rounded-full transition">
          {{ theme.isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </header>
</template>