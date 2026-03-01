<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Product } from './types/Product';
import ProductCard from './components/ProductCard.vue';

const products = ref<Product[]>([]);
const searchQuery = ref(''); 
const isLoading = ref(true);

const fetchProducts = async (query = '') => {
  isLoading.value = true;
  try {
    let url = '';
    
    if (query) {
      // If searching, use the search endpoint
      url = `https://dummyjson.com/products/search?q=${query}`;
    } else {
      // If no search, get a large batch of items (e.g., 50) to pick from
      url = 'https://dummyjson.com/products?limit=50';
    }
      
    const response = await fetch(url);
    const data = await response.json();
    let results = data.products;

    // RANDOMIZER LOGIC: Only shuffle if we aren't searching
    if (!query) {
      results = results
        .sort(() => Math.random() - 0.5) // Shuffles the array randomly
        .slice(0, 12); // Take only the first 12 random items
    }

    products.value = results;
  } catch (error) {
    console.error("Fetch failed:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchProducts());

watch(searchQuery, (newVal) => {
  if (newVal.length > 2 || newVal.length === 0) {
    fetchProducts(newVal);
  }
});
</script>

<template>
  <div class="app-container">
    <header>
      <h1>🔌 ElectroHub</h1>
      <div class="search-container">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search modules (LED, Lamp, Phone...)" 
          class="search-bar"
        />
      </div>
    </header>

    <div v-if="isLoading" class="status">Connecting to warehouse...</div>

    <main v-else-if="products.length > 0" class="product-grid">
      <ProductCard 
        v-for="item in products" 
        :key="item.id" 
        :product="item" 
      />
    </main>

    <div v-else class="status">No components found for "{{ searchQuery }}"</div>
  </div>
</template>

<style>
body {
  margin: 0;
  background-color: #121212;
  color: white;
  font-family: sans-serif;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

header { text-align: center; margin-bottom: 40px; }

.search-container { margin: 20px 0; }
.search-bar {
  width: 100%;
  max-width: 500px;
  padding: 12px 25px;
  border-radius: 30px;
  border: 1px solid #444;
  background: #222;
  color: white;
  outline: none;
}

.product-grid {
  display: grid !important;
  /* FORCING 3 COLUMNS TO TEST */
  grid-template-columns: 1fr 1fr 1fr; 
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* On small screens, go back to 1 column */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.status { text-align: center; margin-top: 50px; color: #3498db; }
</style>