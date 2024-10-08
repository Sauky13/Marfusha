<template>
  <div class="container">
    <header-component />
    <catalog-price-page :catalogName="catalog.name" />
    <footer-component />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'

import FooterComponent from '@/components/FooterComponent.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CatalogPricePage from '@/components/CatalogPriceComponent.vue'
const route = useRoute();
const catalog = ref({});
const error = ref(null);

onMounted(async () => {
  const id = route.params.id;
  try {
    const response = await fetch(`https://0052e5635286382d.mokky.dev/catalog/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    catalog.value = await response.json();
  } catch (e) {
    error.value = e.message;
  }
});
</script>

<style>
.container {
  display: flex;
  gap: 15px;
}
</style>
