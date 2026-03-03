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
    class="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
    @click="goToDetail"
  >
    <!-- Image -->
    <div class="aspect-square bg-[#f9f9f9] dark:bg-gray-900 flex items-center justify-center p-2">
      <img
        :src="product.thumbnail"
        class="w-full h-full object-contain"
        :alt="product.title"
      />
    </div>

    <!-- Info -->
    <div class="p-4 space-y-2">
      <h4 class="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[40px]">
        {{ product.title }}
      </h4>
      
      <div class="flex flex-col">
        <span class="text-xl font-bold text-[#ff6600]">${{ product.price }}</span>
        <div class="flex items-center gap-1 mt-1">
          <span class="text-yellow-400 text-xs">★</span>
          <span class="text-xs text-gray-500">{{ product.rating?.toFixed(1) }}</span>
        </div>
      </div>

      <button 
        @click.stop="cart.add(product)"
        class="w-full mt-2 py-1.5 bg-[#ff6600] hover:bg-[#e65c00] text-white text-xs font-bold rounded transition-colors uppercase"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>