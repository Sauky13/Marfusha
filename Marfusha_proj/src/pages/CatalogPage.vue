<template>
  <div class="container">
    <header-component />
    <card-list-component :items="items" />
    <footer-component />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import CardListComponent from '@/components/CardListComponent.vue'
import { onMounted, ref } from 'vue'

const items = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://0052e5635286382d.mokky.dev/catalog')
    const data = await response.json()
    items.value = data
  } catch (error) {
    console.log(error)
  }
})
</script>


<style></style>
