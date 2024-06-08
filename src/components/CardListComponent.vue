<template>
  <div class="container__card">
    <catalog-card v-for="item in items" :key="item.id" :imgUrl="item.img" :title="item.name" :id="item.id" />
  </div>
</template>

<script setup>
import CatalogCard from '@/components/CatalogCard.vue'

defineProps({
  items: Array
})
</script>

<style scoped>
.container__card {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
}
</style>
