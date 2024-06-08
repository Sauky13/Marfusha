<template>
  <div class="catalog__price">
    <h2>{{ catalogName }}</h2>
    <div class="service__container">
      <div class="service__price" v-for="item in services" :key="item.id">
        <h2 class="name">{{ item.name }}</h2>
        <p class="price">{{ item.price }}</p>
      </div>
    </div>
    <button id="btn" @click="goToRecords">ЗАПИСАТЬСЯ</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRecords = () => {
  router.push('/records')
}

defineProps({
  catalogName: String
})

const route = useRoute()
const services = ref([])
const error = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    const response = await fetch(`https://0052e5635286382d.mokky.dev/services`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const allServices = await response.json()
    if (allServices) {
      services.value = allServices.filter((service) => service.catalog_id === id)
    }
  } catch (e) {
    error.value = e.message
  }
})
</script>

<style scoped>
.service__price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 16px;
  gap: 15px;
  border-bottom: 1px solid rgba(99, 99, 99, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  color: rgba(158, 125, 93, 1);
}

.service__price .name,
.service__price .price {
  margin: 0;
}

.service__details {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.service__details .name,
.service__details .price {
  margin: 0;
}

.service__price h2 {
  font-size: 24px;
  font-weight: bold;
  color: #8a6d55;
}

.service__price p {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  width: 50%;
}

.catalog__price {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 80%;
  margin: auto;
}

.catalog__price h2 {
  color: #8a6d55;
  font-size: 32px;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #8a6d55;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;
  height: 50px;
}

button:hover {
  background-color: #6d5548;
}
</style>
