<script setup lang="ts">
import { ref, onMounted } from 'vue';
// This ensures you are using your custom type for strict typing
import type { Product } from './types/Product';
import ProductCard from './components/ProductCard.vue';

const products = ref<Product[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    // We fetch a search result for 'lighting' to get a group of electronic-themed items
    const response = await fetch('https://dummyjson.com/products/search?q=lighting');
    const data = await response.json();
    
    // products.value must be set to data.products to get the full list
    products.value = data.products; 
  } catch (error) {
    console.error("Fetch failed:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🔌 ElectroHub</h1>
      <p>Project Modules & Components</p>
    </header>

    <div v-if="isLoading" class="loading">Searching warehouse...</div>

    <main v-else class="product-grid">
      <ProductCard 
        v-for="item in products" 
        :key="item.id" 
        :product="item" 
      />
    </main>
  </div>
</template>

<style>
.app-container { max-width: 1200px; margin: 0 auto; padding: 20px; color: white; }
header { text-align: center; margin-bottom: 40px; }
.loading { text-align: center; font-size: 1.5rem; margin-top: 50px; }
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}



.search-wrapper {
  margin: 20px auto;
  max-width: 500px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border-radius: 25px;
  border: 1px solid #444;
  background: #222;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
}

.no-results {
  text-align: center;
  margin-top: 50px;
  color: #7f8c8d;
}

body {
  margin: 0;
  background-color: #1a1a1a; /* Dark theme to match your ElectroHub logo */
  color: white;
  font-family: Arial, sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header { text-align: center; margin-bottom: 40px; }

/* THIS IS THE CSS THAT FIXES THE SINGLE ITEM LOOK */
.product-grid {
  display: grid;
  /* repeat(auto-fill...) makes the grid responsive for all screen sizes */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.loading { text-align: center; font-size: 1.5rem; margin-top: 50px; }
</style>