<template>
  <div class="container">
    <header-component/>
    <registration-form/>
    <footer-component/>
  </div>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<style>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
</style>