<template>
  <div class="container">
    <header-component />
    <MyHello />
    <BannerHome />
    <reviews-form />
    <footer-component />
  </div>
</template>

<script setup>
import MyHello from '../components/MyHello.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import ReviewsForm from '@/components/ReviewsForm.vue'
import BannerHome from '@/components/BannerHome.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
</style>
