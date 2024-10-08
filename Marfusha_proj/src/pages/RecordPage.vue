<template>
    <div class="container">
      <header-component />
        <record-service-component />
      <footer-component />
    </div>
  </template>
  
  <script setup>
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import FooterComponent from '@/components/FooterComponent.vue'
  import RecordServiceComponent from '@/components/RecordServiceComponent.vue';
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  </style>