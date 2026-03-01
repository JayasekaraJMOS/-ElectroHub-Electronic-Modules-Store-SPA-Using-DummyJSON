<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Product } from './types/Product';
import ProductCard from './components/ProductCard.vue';

// 1. Create a reactive list of products (Typed to your Interface)
const products = ref<Product[]>([]);

// 2. Fetch data from DummyJSON
onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products/category/smartphones');
  const data = await response.json();
  products.value = data.products;
});
</script>

<template>
  <div class="container">
    <header>
      <h1>🔌 ElectroHub</h1>
    </header>

    <main class="product-grid">
      <ProductCard 
        v-for="item in products" 
        :key="item.id" 
        :product="item" 
      />
    </main>
  </div>
</template>

<style>
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
header { text-align: center; margin-bottom: 40px; }
</style>