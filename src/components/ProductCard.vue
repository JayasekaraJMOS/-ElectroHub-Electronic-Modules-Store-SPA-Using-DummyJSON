<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types/Product'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cart = useCartStore()

const goToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div
    class="bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group rounded-sm border border-transparent hover:border-gray-200"
    @click="goToDetail"
  >
    <!-- Image Container -->
    <div class="relative bg-white aspect-square flex items-center justify-center overflow-hidden border-b border-gray-100">
      <img
        :src="product.thumbnail"
        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
        :alt="product.title"
      />
      <!-- Discount Badge -->
      <div v-if="product.discountPercentage" class="absolute top-0 left-0 bg-[#f85606] text-white text-[10px] font-bold px-1.5 py-0.5 z-10">
        -{{ Math.round(product.discountPercentage) }}%
      </div>
    </div>

    <div class="p-2 space-y-1">
      <!-- Title -->
      <h3 class="text-[13px] leading-tight line-clamp-2 text-gray-800 group-hover:text-[#f85606] transition-colors h-8 mb-1">{{ product.title }}</h3>
      
      <!-- Price -->
      <div class="flex flex-col">
        <span class="text-[#f85606] text-lg font-medium leading-none">${{ product.price }}</span>
        <div class="flex items-center gap-2 mt-0.5">
           <span v-if="product.discountPercentage" class="text-xs text-gray-400 line-through">${{ (product.price * (1 + product.discountPercentage/100)).toFixed(2) }}</span>
        </div>
      </div>

      <!-- Rating -->
      <div class="flex items-center gap-1 mt-1">
        <div class="flex text-[10px] text-yellow-400">
           <span v-for="i in 5" :key="i">★</span>
        </div>
        <span class="text-[10px] text-gray-400">({{ product.rating ? Math.floor(product.rating * 10) : 0 }})</span>
      </div>

      <!-- Add to Cart Hidden Button (Shows on Hover) -->
      <div class="pt-2">
         <button 
           @click.stop="cart.add(product)"
           class="w-full py-1.5 text-[11px] font-bold text-[#f85606] border border-[#f85606] rounded-sm hover:bg-orange-50 transition-colors uppercase opacity-0 group-hover:opacity-100"
         >
           Add to Cart
         </button>
      </div>
    </div>
  </div>
</template>