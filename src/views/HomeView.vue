<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import NavBar from '../components/NavBar.vue'
import type { Product } from '../types/Product'
import { useSearchStore } from '../stores/search'

const products = ref<Product[]>([])
const categories = ref<string[]>(['All', 'Beauty', 'Fragrances', 'Furniture', 'Groceries', 'Laptops', 'Smartphones', 'Tops'])
const currentCategory = ref('All')
const isLoading = ref<boolean>(true)
const search = useSearchStore()

const fetchProducts = async () => {
  isLoading.value = true
  try {
    let url = 'https://dummyjson.com/products?limit=50'
    
    if (search.query) {
      url = `https://dummyjson.com/products/search?q=${search.query}`
    } else if (currentCategory.value !== 'All') {
      // Map names if needed, but here simple lowercase works for these
      url = `https://dummyjson.com/products/category/${currentCategory.value.toLowerCase()}`
    }

    const response = await fetch(url)
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error('Fetch error:', error)
  } finally {
    isLoading.value = false
  }
}

const selectCategory = (cat: string) => {
  currentCategory.value = cat
  if (cat !== 'All') search.query = '' // Clear search if a specific category is chosen
  fetchProducts()
}

onMounted(() => {
  fetchProducts()
})

watch(() => search.query, () => {
  if (search.query) currentCategory.value = 'All'
  fetchProducts()
})
</script>

<template>
  <NavBar />

  <main class="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500">
    <!-- Categories / Promo Bar -->
    <div class="bg-[var(--card-bg)] border-b border-[var(--border-color)]">
      <div class="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          @click="selectCategory(cat)"
          :class="['px-4 py-1 text-xs font-bold rounded-full transition-all border shrink-0', currentCategory === cat ? 'bg-[#ff6600] border-[#ff6600] text-white' : 'bg-transparent border-transparent text-[var(--text-muted)] hover:text-[#ff6600]']"
        >
          {{ cat.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- Classic Banner -->
    <section class="max-w-7xl mx-auto px-4 mt-6">
      <div class="relative h-[280px] rounded-sm overflow-hidden bg-[#ff6600] shadow-sm">
        <div class="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
        <div class="relative z-20 h-full flex flex-col justify-center px-12 text-white">
          <span class="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Flash Sale Live Now</span>
          <h2 class="text-4xl md:text-5xl font-bold mb-4">The Real Sale <br/><span class="text-yellow-400">MEGA DEALS</span></h2>
          <button class="w-fit px-8 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-sm transition shadow-lg">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase tracking-tight">
          {{ search.query ? `Results for "${search.query}"` : (currentCategory === 'All' ? 'Just For You' : currentCategory) }}
        </h3>
        <div class="h-0.5 flex-grow mx-4 bg-gray-200 dark:bg-gray-800"></div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="i in 12" :key="i" class="aspect-[3/4] bg-[var(--card-bg)] rounded-md animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
        <ProductCard
          v-for="item in products"
          :key="item.id"
          :product="item"
        />
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && products.length === 0" class="text-center py-24 bg-[var(--card-bg)] rounded border border-[var(--border-color)] mt-8">
        <p class="text-gray-500 font-bold uppercase">No products found</p>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="bg-[#222] text-[#ccc] py-12 mt-12 border-t-4 border-[#ff6600]">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
      <div class="space-y-4">
        <h4 class="text-white font-bold uppercase">Customer Care</h4>
        <ul class="space-y-2 opacity-80">
          <li>Handshake</li>
          <li>Help Center</li>
          <li>How to Buy</li>
          <li>Corporate & Bulk Purchasing</li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="text-white font-bold uppercase">OnlineStore</h4>
        <ul class="space-y-2 opacity-80">
          <li>About Us</li>
          <li>Digital Payments</li>
          <li>OnlineStore Cares</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div class="space-y-4">
        <h4 class="text-white font-bold uppercase">Contact Us</h4>
        <p class="opacity-80 leading-relaxed">
          123 Commerce Way, Tech City<br/>
          support@onlinestore.com<br/>
          +1 234 567 890
        </p>
      </div>
      <div class="space-y-4">
         <h4 class="text-white font-bold uppercase">Follow Us</h4>
         <div class="flex gap-4 grayscale opacity-60">
            <span>🔵</span> <span>🐦</span> <span>📸</span> <span>📺</span>
         </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-center opacity-40 text-xs">
      &copy; 2024 OnlineStore. All rights reserved.
    </div>
  </footer>
</template>