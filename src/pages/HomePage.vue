<template>
  <div class="container">
    <header-component />
    <HomeComponent />
    <BannerHome />
    <reviews-form />
    <footer-component />
  </div>
</template>

<script setup>
import HomeComponent from '../components/HomeComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import ReviewsForm from '@/components/ReviewsForm.vue'
import BannerHome from '@/components/BannerHome.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style scoped>
</style>
