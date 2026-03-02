<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import NavBar from '../components/NavBar.vue'
import type { Product } from '../types/Product'

const products = ref<Product[]>([])
const searchQuery = ref<string>('')
const isLoading = ref<boolean>(true)

const fetchProducts = async (query: string = '') => {
  isLoading.value = true

  const url = query
    ? `https://dummyjson.com/products/search?q=${query}`
    : 'https://dummyjson.com/products?limit=50'

  const response = await fetch(url)
  const data: { products: Product[] } = await response.json()

  products.value = data.products
  isLoading.value = false
}

onMounted(() => fetchProducts())

watch(searchQuery, (val) => {
  if (val.length > 2 || val.length === 0) {
    fetchProducts(val)
  }
})
</script>

<template>
  <NavBar />

  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 shadow-lg">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold mb-2">Find Your Electronic Components</h1>
        <p class="text-blue-100 text-lg">Browse our collection of premium electronic modules and circuits</p>
      </div>
    </div>

    <!-- Search Section -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="relative">
        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
        <input
          v-model="searchQuery"
          placeholder="Search for resistors, LEDs, sensors..."
          class="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-600 transition text-lg shadow-md"
        />
      </div>
    </div>

    <!-- Products Section -->
    <div class="max-w-7xl mx-auto px-6 pb-12">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="animate-spin text-5xl mb-4">⚡</div>
        <p class="text-gray-500 text-xl font-semibold">Loading products...</p>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="item in products"
          :key="item.id"
          :product="item"
        />
      </div>

      <!-- No Results -->
      <div v-if="!isLoading && products.length === 0" class="text-center py-20">
        <p class="text-gray-500 text-xl">No products found. Try a different search!</p>
      </div>
    </div>
  </div>
</template>