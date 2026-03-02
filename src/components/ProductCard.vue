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

const getRating = (rating: number | undefined) => {
  return rating ? rating.toFixed(1) : 'N/A'
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer group"
    @click="goToDetail"
  >
    <!-- Image Container -->
    <div class="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 flex items-center justify-center overflow-hidden group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-100 transition">
      <img
        :src="product.thumbnail"
        class="h-40 w-40 object-contain group-hover:scale-110 transition duration-300"
        :alt="product.title"
      />
    </div>

    <div class="p-4">
      <!-- Title -->
      <h3 class="font-bold text-sm md:text-base line-clamp-2 text-gray-800 group-hover:text-blue-600 transition">{{ product.title }}</h3>
      
      <!-- Rating and Stock -->
      <div class="flex justify-between items-center mt-2 text-xs text-gray-600">
        <span v-if="product.rating" class="flex items-center gap-1">
          <span>⭐</span>
          <span class="font-semibold text-yellow-600">{{ getRating(product.rating) }}</span>
        </span>
        <span v-if="product.stock" class="text-green-600 font-semibold">In Stock</span>
      </div>

      <!-- Price -->
      <div class="mt-3 flex justify-between items-baseline gap-2">
        <p class="text-2xl font-bold text-green-600">${{ product.price }}</p>
        <p v-if="product.discountPercentage" class="text-xs text-red-600">-{{ product.discountPercentage }}%</p>
      </div>

      <!-- Add to Cart Button -->
      <button
        class="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-200 shadow-md hover:shadow-lg"
        @click.stop="cart.add(product)"
      >
        🛒 Add to Cart
      </button>
    </div>
  </div>
</template>