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

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <div class="animate-spin text-6xl mb-4">⚡</div>
        <p class="text-gray-600 text-lg">Loading product details...</p>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="py-12 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          ← Back
        </button>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Image Section -->
          <div class="flex items-center justify-center bg-white rounded-xl shadow-lg p-8">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="max-h-96 object-contain"
            />
          </div>

          <!-- Details Section -->
          <div class="space-y-6">
            <!-- Title and Rating -->
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                {{ product.title }}
              </h1>
              <div class="flex items-center gap-4">
                <span v-if="product.rating" class="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                  <span class="text-xl">⭐</span>
                  <span class="font-bold text-yellow-700">{{ product.rating.toFixed(1) }}</span>
                </span>
                <span v-if="product.reviews" class="text-gray-600">({{ product.reviews.length }} reviews)</span>
              </div>
            </div>

            <!-- Stock Status -->
            <div v-if="product.stock" class="bg-green-100 border-l-4 border-green-600 p-4 rounded">
              <p class="text-green-800 font-semibold">✓ In Stock ({{ product.stock }} available)</p>
            </div>
            <div v-else class="bg-red-100 border-l-4 border-red-600 p-4 rounded">
              <p class="text-red-800 font-semibold">✗ Out of Stock</p>
            </div>

            <!-- SKU -->
            <div v-if="product.sku" class="text-gray-600 space-y-1">
              <p class="font-semibold">Product SKU</p>
              <p class="text-gray-800 font-mono bg-gray-100 p-2 rounded">{{ product.sku }}</p>
            </div>

            <!-- Description -->
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-2">Description</h2>
              <p class="text-gray-600 text-lg leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Brand -->
            <div v-if="product.brand" class="text-gray-600">
              <p class="font-semibold text-gray-800">Brand: <span class="font-bold">{{ product.brand }}</span></p>
            </div>

            <!-- Category -->
            <div v-if="product.category" class="text-gray-600">
              <p class="font-semibold text-gray-800">Category: <span class="font-bold capitalize">{{ product.category }}</span></p>
            </div>

            <!-- Price and Action -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
              <div class="flex items-baseline gap-4 mb-6">
                <p class="text-5xl font-bold text-green-600">${{ product.price }}</p>
                <p v-if="product.discountPercentage" class="text-2xl text-red-600 font-bold">-{{ product.discountPercentage }}%</p>
              </div>

              <button
                @click="addToCart"
                :disabled="!product.stock"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
      <p class="text-gray-600 text-xl mb-4">Product not found</p>
      <button @click="goBack" class="text-blue-600 hover:text-blue-800">← Go Back</button>
    </div>
  </div>
</template>