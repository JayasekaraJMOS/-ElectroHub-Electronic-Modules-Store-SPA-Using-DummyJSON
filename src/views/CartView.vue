<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const cart = useCartStore()

const total = computed(() => {
  return cart.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)
})

const goBack = () => {
  router.back()
}

const removeItem = (id: number) => {
  cart.remove(id)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cart.clear()
  }
}

const checkout = () => {
  alert('Thank you for your purchase! This is a demo store.')
  cart.clear()
  router.push('/')
}
</script>

<template>
  <NavBar />

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <button
        @click="goBack"
        class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
      >
        ← Back
      </button>

      <h1 class="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <!-- Empty Cart -->
      <div v-if="cart.items.length === 0" class="text-center py-20 bg-white rounded-xl shadow-lg p-8">
        <div class="text-6xl mb-4">🛒</div>
        <p class="text-gray-600 text-xl font-semibold mb-6">Your cart is empty</p>
        <button
          @click="() => router.push('/')"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>

      <!-- Cart Items -->
      <div v-else class="space-y-6">
        <!-- Items List -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="divide-y">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="p-6 flex gap-6 hover:bg-gray-50 transition"
            >
              <!-- Image -->
              <div class="bg-gray-100 rounded-lg p-4 flex-shrink-0 hidden sm:flex items-center justify-center w-24 h-24">
                <img
                  :src="item.thumbnail"
                  :alt="item.title"
                  class="max-w-full max-h-full object-contain"
                />
              </div>

              <!-- Details -->
              <div class="flex-grow">
                <h3 class="font-bold text-lg text-gray-800 mb-2">{{ item.title }}</h3>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ item.description }}</p>
                <div class="flex justify-between items-center">
                  <p class="text-2xl font-bold text-green-600">${{ item.price }}</p>
                  <button
                    @click="removeItem(item.id)"
                    class="text-red-600 hover:text-red-800 font-semibold transition"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Summary Card -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div class="space-y-3 mb-6 pb-6 border-b-2 border-gray-200">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span class="font-semibold">${{ total }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span class="font-semibold">FREE</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Tax (estimated):</span>
                <span class="font-semibold">${{ (parseFloat(total) * 0.1).toFixed(2) }}</span>
              </div>
            </div>
            <div class="flex justify-between items-center mb-6">
              <span class="text-xl font-bold text-gray-800">Total:</span>
              <span class="text-3xl font-bold text-green-600">${{ (parseFloat(total) * 1.1).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3 flex flex-col">
            <button
              @click="checkout"
              class="flex-grow bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition shadow-lg"
            >
              💳 Checkout
            </button>
            <button
              @click="clearCart"
              class="bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              🗑️ Clear Cart
            </button>
            <button
              @click="() => router.push('/')"
              class="bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
