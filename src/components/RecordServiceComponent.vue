<template>
  <div class="Records__service__container">
    <p v-if="message">{{ message }}</p>
    <form v-if="!formSubmitted" @submit.prevent="submitForm">
      <p>Выберите услугу</p>
      <input type="text" v-model="searchTerm" placeholder="Поиск услуги" class="search-input" />
      <div v-for="service in filteredServices" :key="service.id" class="service-item">
        <input
          type="checkbox"
          :id="service.id"
          :value="service.id"
          v-model="selectedServices"
          class="service-checkbox"
        />
        <label :for="service.id" class="service-label"
          >{{ service.name }} {{ service.price }}</label
        >
      </div>
      <p>Выберите дату</p>
      <input type="date" v-model="selectedDate" :min="today" class="date-input" />
      <p>Выберите время</p>
      <select class="time-select">
        <option v-for="(time, index) in times" :key="index">{{ time.time }}</option>
      </select>
      <p v-if="selectedServices.length > 0" class="total-cost">
        Итоговая стоимость: <span class="cost">{{ totalCost }}</span>
      </p>
      <button type="submit" class="submit-button" :disabled="!isFormValid">Записаться</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const services = ref([])
const selectedServices = ref([])
const searchTerm = ref('')
const message = ref('')
const formSubmitted = ref(false)
const today = new Date().toISOString().split('T')[0]
const selectedDate = ref([])

onMounted(async () => {
  try {
    const servicesResponse = await axios.get('https://0052e5635286382d.mokky.dev/services')
    services.value = servicesResponse.data
  } catch (error) {
    console.error(error)
  }
})

onMounted(async () => {
  try {
    const response = await axios.get('https://0052e5635286382d.mokky.dev/time')
    selectedDate.value = response.data
  } catch (error) {
    console.error(error)
  }
})

const totalCost = computed(() => {
  return selectedServices.value.reduce((total, id) => {
    const service = services.value.find((service) => service.id === id)
    return total + (service ? parseFloat(service.price) : 0)
  }, 0)
})

const isFormValid = computed(() => {
  return selectedServices.value.length > 0
})

const filteredServices = computed(() => {
  if (!searchTerm.value) {
    return services.value
  }
  return services.value.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const submitForm = async () => {
  try {
    const selectedServiceNames = selectedServices.value.map((id) => {
      const service = services.value.find((service) => service.id === id)
      return service ? service.name : ''
    })

    const totalCost = selectedServices.value.reduce((total, id) => {
      const service = services.value.find((service) => service.id === id)
      return total + (service ? parseFloat(service.price) : 0)
    }, 0)

    const userId = localStorage.getItem('user_id')

    await axios.post('https://0052e5635286382d.mokky.dev/records', {
      user_id: userId,
      services_id: selectedServices.value,
      serviceNames: selectedServiceNames,
      totalCost: totalCost,
      awaits: true,
      accepted: false,
      done: false
    })
    message.value = 'Запись успешно создана, вы можете отслеживать свои записи в личном кабинете.'
    formSubmitted.value = true
  } catch (error) {
    console.error(error)
    message.value = 'Произошла ошибка при записи. Пожалуйста, попробуйте еще раз.'
  }
}
</script>

<style scoped>
form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
}

.submit-button {
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  background-color: transparent;
  color: rgba(158, 125, 93, 1);
  border: 2px solid rgba(158, 125, 93, 1);
  transition: transform 0.3s ease-in-out;
}

.submit-button:hover {
  transform: scale(1.05);
}
.total-cost {
  text-align: center;
  font-size: larger;
}

.cost {
  color: red;
}

.submit-button:active {
  transform: scale(0.3);
}

.submit-button:disabled {
  background-color: grey;
  cursor: not-allowed;
}

.submit-button:disabled {
  color: rgb(70, 70, 70);
  border: 2px solid rgb(70, 70, 70);
  background-color: transparent;
  cursor: not-allowed;
}

.Records__service__container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

.service-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.service-checkbox {
  margin-right: 10px;
}

.service-label {
  font-size: 16px;
}
.date-input,
.time-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}

.service-checkbox {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border: 2px solid rgb(105, 89, 72);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  outline: none;
  cursor: pointer;
  position: relative;
}

.service-checkbox:checked {
  background-color: rgb(105, 89, 72);
}

.service-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
