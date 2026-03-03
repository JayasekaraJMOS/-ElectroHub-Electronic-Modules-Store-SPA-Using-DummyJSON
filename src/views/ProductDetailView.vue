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


</script>

<template>
  <NavBar />

  <div class="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-500 pb-12">
    <!-- Breadcrumbs -->
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-tight">
        <button @click="router.push('/')" class="hover:text-[#ff6600]">Home</button>
        <span>/</span>
        <span class="text-gray-400 capitalize">{{ product?.category }}</span>
        <span>/</span>
        <span class="text-gray-900 dark:text-gray-200 truncate">{{ product?.title }}</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="w-12 h-12 border-4 border-[#ff6600]/20 border-t-[#ff6600] rounded-full animate-spin"></div>
    </div>

    <!-- Product Content -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-start">
      <!-- Left: Image -->
      <div class="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-sm shadow-sm md:sticky md:top-24">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-auto object-contain max-h-[500px]"
        />
        
        <!-- Small Images Mockup -->
        <div class="flex gap-4 mt-8 justify-center opacity-60">
           <div v-for="i in 3" :key="i" class="w-16 h-16 border border-gray-200 dark:border-gray-800 p-1 bg-gray-50 dark:bg-gray-900 rounded-sm cursor-pointer hover:border-[#ff6600]">
              <img :src="product.thumbnail" class="w-full h-full object-contain" />
           </div>
        </div>
      </div>

      <!-- Right: Details -->
      <div class="space-y-6">
        <div class="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-sm shadow-sm">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2">
            {{ product.title }}
          </h1>
          
          <div class="flex items-center gap-4 mb-6">
             <div class="flex items-center gap-1">
                <span class="text-yellow-400">★</span>
                <span class="text-sm font-bold text-gray-600 dark:text-gray-400">{{ product.rating }}</span>
             </div>
             <div class="h-4 w-px bg-gray-200 dark:bg-gray-800"></div>
             <span class="text-xs font-bold text-blue-500 uppercase">1.2k+ Sold</span>
          </div>

          <div class="border-t border-b border-gray-100 dark:border-gray-800 py-6 mb-8">
             <div class="flex items-baseline gap-4">
                <span class="text-4xl font-bold text-[#ff6600]">${{ product.price }}</span>
                <span v-if="product.discountPercentage" class="text-lg text-gray-400 line-through">
                   ${{ (product.price * (1 + product.discountPercentage/100)).toFixed(2) }}
                </span>
                <span v-if="product.discountPercentage" class="text-sm text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 font-bold">
                   -{{ Math.round(product.discountPercentage) }}%
                </span>
             </div>
             <p class="text-xs text-gray-400 font-bold mt-2 uppercase">Promotional Price Included</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
             <button
               @click="addToCart"
               class="bg-[#ff6600] hover:bg-[#e65c00] text-white py-4 font-bold rounded-sm shadow-sm transition-transform active:scale-95 uppercase"
             >
               Add to Cart
             </button>
             <button class="bg-[#26abd4] hover:bg-[#1a90b5] text-white py-4 font-bold rounded-sm shadow-sm transition-transform active:scale-95 uppercase">
               Buy Now
             </button>
          </div>
        </div>

        <!-- Description Box -->
        <div class="bg-[var(--card-bg)] border border-[var(--border-color)] p-8 rounded-sm shadow-sm">
           <h3 class="text-lg font-bold text-gray-800 dark:text-gray-200 uppercase mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Description</h3>
           <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
             {{ product.description }}
           </p>
           
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <div class="space-y-1">
                 <span class="text-[10px] text-gray-400 font-bold uppercase">Condition</span>
                 <p class="text-sm font-bold text-gray-700 dark:text-gray-300">Brand New</p>
              </div>
              <div class="space-y-1">
                 <span class="text-[10px] text-gray-400 font-bold uppercase">Warranty</span>
                 <p class="text-sm font-bold text-gray-700 dark:text-gray-300">Standard Manufacturer</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>