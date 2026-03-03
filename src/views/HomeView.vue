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

  <div class="min-h-screen bg-[#f5f5f5] dark:bg-gray-900 transition-colors duration-300">
    <!-- Main Content Wrapper -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      
      <!-- Top Banner / Carousel Area -->
      <div class="flex gap-4 mb-6">
        <!-- Main Carousel (Simulator) -->
        <div class="flex-grow bg-[#6a1b9a] rounded-sm overflow-hidden relative group h-[380px] shadow-sm">
           <div class="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 flex items-center justify-between px-12">
              <div class="text-white z-10 max-w-lg">
                 <p class="text-orange-400 font-bold mb-2 uppercase tracking-widest">3.3 THE REAL SALE</p>
                 <h2 class="text-6xl font-black mb-4 leading-none">MEGA DEALS</h2>
                 <p class="text-xl mb-8 opacity-90">Real Discounts. Real Mega Deals.</p>
                 <button class="bg-[#f85606] text-white px-8 py-3 rounded-sm font-bold hover:bg-orange-700 transition shadow-lg">Shop Now</button>
              </div>
              <!-- Simulated Product Image -->
              <div class="relative h-full flex items-center">
                 <div class="w-80 h-80 bg-white/10 rounded-full absolute blur-3xl"></div>
                 <img src="https://dummyjson.com/product-images/1/thumbnail.jpg" class="w-96 relative z-10 drop-shadow-2xl animate-pulse" alt="Promo">
              </div>
           </div>
           <!-- Dots -->
           <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <div v-for="i in 5" :key="i" :class="['w-2.5 h-2.5 rounded-full border border-white', i===1 ? 'bg-white' : 'bg-transparent']"></div>
           </div>
        </div>

        <!-- Side App Promo -->
        <div class="hidden lg:block w-[280px] bg-white rounded-sm p-4 shadow-sm border border-gray-100">
           <div class="flex items-center gap-2 mb-4">
              <span class="text-2xl text-orange-600">📱</span>
              <span class="font-bold text-gray-700">TRY DARAZ APP</span>
           </div>
           <div class="bg-orange-50 rounded-sm p-4 text-center mb-4">
              <p class="text-orange-600 font-bold text-sm mb-1">⭐ 4.8 Rated</p>
              <p class="text-gray-500 text-xs">Download the App now</p>
           </div>
           <div class="space-y-3">
              <div class="flex items-center gap-3 p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer transition">
                 <div class="bg-green-100 p-2 rounded">🚚</div>
                 <div class="text-[10px] font-bold text-gray-600">Free Shipping</div>
              </div>
              <div class="flex items-center gap-3 p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer transition">
                 <div class="bg-orange-100 p-2 rounded">🎫</div>
                 <div class="text-[10px] font-bold text-gray-600">Exclusive Vouchers</div>
              </div>
           </div>
        </div>
      </div>

      <!-- Flash Sale Header -->
      <div class="mb-4 flex items-center justify-between">
         <h3 class="text-xl font-medium text-gray-700">Flash Sale</h3>
         <button class="text-orange-600 font-bold text-sm hover:underline">SHOP MORE</button>
      </div>

      <!-- Products Section -->
      <div class="pb-12">
        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-32">
          <div class="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <ProductCard
            v-for="item in products"
            :key="item.id"
            :product="item"
          />
        </div>

        <!-- No Results -->
        <div v-if="!isLoading && products.length === 0" class="text-center py-32 bg-white rounded-sm">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-gray-600 font-bold text-xl">Nothing found</p>
          <p class="text-gray-400">Try a different search term</p>
        </div>
      </div>
    </div>
  </div>
</template>