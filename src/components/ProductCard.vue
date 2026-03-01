<script setup lang="ts">
// 1. This connects to your custom folder to ensure 'Type Safety'
import type { Product } from '../types/Product';

// 2. This defines the 'Props' so App.vue can pass data into this card
defineProps<{
  product: Product
}>();
</script>

<template>
  <div class="card">
    <div class="image-container">
      <img :src="product.thumbnail" :alt="product.title" />
      <span class="category-tag">{{ product.category }}</span>
    </div>
    
    <div class="card-body">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="manufacturer">By {{ product.brand }}</p>
      
      <div class="price-row">
        <span class="price">${{ product.price }}</span>
        <span :class="['stock-status', product.stock < 10 ? 'critical' : 'stable']">
          {{ product.stock }} in stock
        </span>
      </div>

      <button class="buy-button">
        Add to Project
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Professional Card Styling */
.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

.image-container {
  position: relative;
  height: 200px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

img { 
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  padding: 10px; 
}

.category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(44, 62, 80, 0.9);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-body { padding: 20px; flex-grow: 1; }

.product-title {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.manufacturer {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 15px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #27ae60;
}

.stock-status { font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; }
.stable { background: #e8f5e9; color: #2e7d32; }
.critical { background: #ffebee; color: #c62828; }

.buy-button {
  width: 100%;
  background: #3498db;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-button:hover { background: #2980b9; }
</style>