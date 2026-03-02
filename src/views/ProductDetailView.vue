<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import NavBar from '../components/NavBar.vue'
import type { Product } from '../types/Product'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const product = ref<Product | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/${route.params.id}`
    )
    product.value = await response.json()
  } finally {
    isLoading.value = false
  }
})

const addToCart = () => {
  if (product.value) {
    cart.add(product.value)
    alert('Product added to cart!')
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <NavBar />

  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-850 transition-colors duration-300">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <div class="animate-bounce text-8xl mb-4">🛍️</div>
        <p class="text-gray-600 dark:text-gray-400 text-xl font-bold">Loading product details...</p>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="mb-8 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold transition-all duration-300 hover:gap-4"
        >
          ← Back
        </button>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Image Section -->
          <div class="flex items-center justify-center bg-white dark:bg-gray-700 rounded-2xl shadow-xl h-96">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="max-h-80 max-w-80 object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>

          <!-- Details Section -->
          <div class="space-y-6">
            <!-- Title and Rating -->
            <div>
              <h1 class="text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                {{ product.title }}
              </h1>
              <div class="flex items-center gap-4">
                <span v-if="product.rating" class="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800 px-6 py-3 rounded-full">
                  <span class="text-2xl">⭐</span>
                  <span class="font-black text-2xl text-yellow-700 dark:text-yellow-300">{{ product.rating.toFixed(1) }}</span>
                </span>
                <span v-if="product.reviews" class="text-gray-600 dark:text-gray-400 font-semibold">({{ product.reviews.length }} reviews)</span>
              </div>
            </div>

            <!-- Stock Status -->
            <div v-if="product.stock" class="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 border-l-4 border-green-600 dark:border-green-400 p-6 rounded-xl">
              <p class="text-green-800 dark:text-green-200 font-black text-lg">✓ In Stock ({{ product.stock }} available)</p>
            </div>
            <div v-else class="bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900 dark:to-red-800 border-l-4 border-red-600 dark:border-red-400 p-6 rounded-xl">
              <p class="text-red-800 dark:text-red-200 font-black text-lg">✗ Out of Stock</p>
            </div>

            <!-- SKU -->
            <div v-if="product.sku" class="space-y-2">
              <p class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">SKU Number</p>
              <p class="text-gray-900 dark:text-gray-100 font-mono bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg font-bold">{{ product.sku }}</p>
            </div>

            <!-- Description -->
            <div>
              <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-3">Description</h2>
              <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Brand & Category -->
            <div class="grid grid-cols-2 gap-4">
              <div v-if="product.brand">
                <p class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Brand</p>
                <p class="text-gray-900 dark:text-white font-bold">{{ product.brand }}</p>
              </div>
              <div v-if="product.category">
                <p class="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</p>
                <p class="text-gray-900 dark:text-white font-bold capitalize">{{ product.category }}</p>
              </div>
            </div>

            <!-- Price and Action -->
            <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 p-8 rounded-2xl border-2 border-indigo-200 dark:border-indigo-700">
              <div class="flex items-baseline gap-4 mb-6">
                <p class="text-6xl font-black text-green-600 dark:text-green-400">${{ product.price }}</p>
                <p v-if="product.discountPercentage" class="text-3xl text-red-600 dark:text-red-400 font-black">-{{ product.discountPercentage }}%</p>
              </div>

              <button
                @click="addToCart"
                :disabled="!product.stock"
                class="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 text-white text-xl py-5 rounded-xl font-black hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-indigo-800 dark:hover:via-purple-800 dark:hover:to-pink-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="flex flex-col items-center justify-center h-screen">
      <p class="text-gray-600 dark:text-gray-400 text-2xl font-bold mb-6">Product not found</p>
      <button @click="goBack" class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-lg font-bold">← Go Back</button>
    </div>
  </div>
</template>