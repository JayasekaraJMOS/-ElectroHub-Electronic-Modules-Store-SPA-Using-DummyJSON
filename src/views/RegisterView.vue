<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const error = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  error.value = ''
  isLoading.value = true
  try {
    const resp = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value
      })
    })
    if (!resp.ok) throw new Error('Registration failed')
    
    // after registration log them in
    await auth.login(username.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Registration error'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--bg-color)] transition-colors duration-500">
    <NavBar />
    
    <div class="flex-grow flex items-center justify-center p-6 text-[var(--text-color)]">
      <div class="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-sm shadow-sm overflow-hidden">
        <div class="p-8">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Create Account</h1>
            <p class="text-xs text-gray-500 font-bold mt-2 uppercase">Join OnlineStore today</p>
          </div>

          <div v-if="error" class="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold rounded-sm">
            {{ error }}
          </div>

          <form @submit.prevent="handleRegister" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] font-bold text-gray-400 uppercase">First Name</label>
                <input
                  v-model="firstName"
                  type="text"
                  placeholder="John"
                  class="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm rounded-sm outline-none focus:border-[#ff6600] transition-colors dark:text-white"
                  required
                />
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-bold text-gray-400 uppercase">Last Name</label>
                <input
                  v-model="lastName"
                  type="text"
                  placeholder="Doe"
                  class="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm rounded-sm outline-none focus:border-[#ff6600] transition-colors dark:text-white"
                  required
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase">Username</label>
              <input
                v-model="username"
                type="text"
                placeholder="johndoe123"
                class="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm rounded-sm outline-none focus:border-[#ff6600] transition-colors dark:text-white"
                required
              />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="john@example.com"
                class="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm rounded-sm outline-none focus:border-[#ff6600] transition-colors dark:text-white"
                required
              />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 uppercase">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="w-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm rounded-sm outline-none focus:border-[#ff6600] transition-colors dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-[#ff6600] hover:bg-[#e65c00] text-white font-bold py-3 rounded-sm transition disabled:opacity-50 uppercase text-xs mt-4"
            >
              {{ isLoading ? 'Initializing...' : 'Sign Up' }}
            </button>
          </form>

          <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
            <p class="text-xs text-gray-500 font-bold uppercase">
              Already have an account? 
              <button @click="router.push('/login')" class="text-[#ff6600] hover:underline">Login Here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
