<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const auth = useAuthStore()
const theme = useThemeStore()
const router = useRouter()
cart.load()
auth.loadSavedAuth()

const goToHome = () => {
  router.push('/')
}

const goToCart = () => {
  router.push('/cart')
}

const logout = () => {
  auth.logout()
  router.push('/login')
}

const login = () => {
  router.push('/login')
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#f85606] shadow-sm transition-colors duration-300">
    <!-- Top thin bar -->
    <div class="bg-[#f85606] border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-1 flex justify-end items-center gap-6 text-[12px] text-white">
        <a href="#" class="hover:underline">SAVE MORE ON APP</a>
        <a href="#" class="hover:underline">BECOME A SELLER</a>
        <a href="#" class="hover:underline">HELP & SUPPORT</a>
        <button v-if="!auth.isAuthenticated" @click="login" class="hover:underline font-bold uppercase">LOGIN</button>
        <button v-if="!auth.isAuthenticated" @click="router.push('/register')" class="hover:underline font-bold uppercase">SIGN UP</button>
        <button v-if="auth.isAuthenticated" @click="logout" class="hover:underline font-bold uppercase">LOGOUT</button>
        <span class="cursor-pointer">ဘာသာစကားရွေးချယ်ရန်</span>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center gap-8">
      <!-- Logo -->
      <button @click="goToHome" class="flex items-center gap-2 flex-shrink-0 transition active:scale-95">
        <div class="flex items-center">
          <span class="text-4xl text-white font-bold italic tracking-tighter">Daraz</span>
          <div class="ml-1 w-2 h-2 bg-white rounded-full"></div>
        </div>
      </button>

      <!-- Search Bar -->
      <div class="flex-grow flex items-center group">
        <div class="relative w-full">
          <input 
            type="text" 
            placeholder="Search in Daraz"
            class="w-full bg-[#eff0f5] py-2 px-4 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
          >
          <button class="absolute right-0 top-0 bottom-0 bg-[#ffe1d2] hover:bg-[#ffcbb3] px-5 flex items-center justify-center transition">
             <span class="text-orange-600">🔍</span>
          </button>
        </div>
      </div>

      <!-- Right Icons -->
      <div class="flex items-center gap-8 flex-shrink-0">
        <!-- Cart -->
        <button @click="goToCart" class="relative group p-1 transition-transform active:scale-90">
          <span class="text-3xl text-white">🛒</span>
          <span 
            v-if="cart.count > 0"
            class="absolute -top-1 -right-2 bg-white text-[#f85606] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm border border-orange-100"
          >
            {{ cart.count }}
          </span>
        </button>

        <!-- User/Logout -->
        <div v-if="auth.isAuthenticated" class="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-md">
           <span class="text-white text-sm font-medium">{{ auth.username }}</span>
        </div>

        <!-- Dark Mode Toggle (Kept for functionality) -->
        <button
          @click="theme.toggleDarkMode"
          class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition text-white text-sm"
          :title="theme.isDark ? 'Light mode' : 'Dark mode'"
        >
          {{ theme.isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>
  </nav>
</template>