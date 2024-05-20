<template>
  <div class="container">
    <header-component/>
    <catalog-card/>
    <footer-component/>
  </div>
</template>

<script setup>
import CatalogCard from "@/components/CatalogCard.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
</style>