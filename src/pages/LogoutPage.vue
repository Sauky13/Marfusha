<template>
    <div class="container">
      <header-component/>
      <logout-component/>
      <footer-component/>
    </div>
  </template>
  
  
  <script setup>
  import HeaderComponent from "@/components/HeaderComponent.vue";
  import FooterComponent from "@/components/FooterComponent.vue";
  import LogoutComponent from "@/components/LogoutComponent.vue";
  </script>
  
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  </style>