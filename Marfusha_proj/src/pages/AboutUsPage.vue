<template>
  <div class="container">
    <header-component />
    <about-us-component />
    <footer-component />
  </div>
</template>


<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import AboutUsComponent from '@/components/AboutUsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>


<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
</style>
