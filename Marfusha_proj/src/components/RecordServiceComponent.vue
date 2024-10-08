<template>
  <div class="Records__service__container">
    <p v-if="!isUserLoggedIn" >
      <router-link class="note" to="/registration">Зарегистрируйтесь</router-link> или
      <router-link class="note" to="/auth">Войдите</router-link> для записи на услугу
    </p>
    <p v-else-if="message">{{ message }}</p>
    <form v-if="!formSubmitted && isUserLoggedIn" @submit.prevent="submitForm">
      <p>Выберите услугу</p>
      <input type="text" v-model="searchTerm" placeholder="Поиск услуги" class="search-input" />
      <div v-for="service in filteredServices" :key="service.id" class="service-item">
        <input
          type="radio"
          :id="service.id"
          :value="service.id"
          v-model="selectedService"
          class="service-radio"
        />
        <label :for="service.id" class="service-label"
          >{{ service.name }} {{ service.price }}</label
        >
      </div>
      <div v-if="selectedService && freeTime.length > 0" class="free-time-container">
        <p>Выберите свободное время и дату:</p>
        <select v-model="selectedTime" class="time-select">
          <option disabled value="">Выберите время и дату</option>
          <option v-for="time in freeTime" :key="time.id" :value="time.id">
            {{ time.time }} {{ time.date }}
          </option>
        </select>
      </div>
      <button type="submit" class="submit-button" :disabled="!isFormValid">Записаться</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const services = ref([])
const selectedService = ref(null)
const searchTerm = ref('')
const message = ref('')
const formSubmitted = ref(false)
const freeTime = ref([])
const selectedTime = ref(null)
const userId = ref(null)
const userName = ref('')
const userNumber = ref('')

onMounted(async () => {
  try {
    const servicesResponse = await axios.get('https://0052e5635286382d.mokky.dev/services')
    services.value = servicesResponse.data
    await getUserData()
  } catch (error) {
    console.error(error)
  }
})

const isUserLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

const getUserData = async () => {
  try {
    const response = await axios.get(`https://0052e5635286382d.mokky.dev/auth_me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    userId.value = response.data.id
    userName.value = response.data.fullName
    userNumber.value = response.data.phoneNumber
  } catch (error) {
    console.error(error)
  }
}

const fetchFreeTime = async (serviceId) => {
  try {
    const response = await axios.get(
      `https://0052e5635286382d.mokky.dev/freetime?service_id=${serviceId}`
    )
    freeTime.value = response.data
  } catch (error) {
    console.error(error)
  }
}

import { watch } from 'vue'

watch(selectedService, (newVal) => {
  if (newVal) {
    fetchFreeTime(newVal)
  }
})

const isFormValid = computed(() => {
  return selectedService.value !== null && selectedTime.value !== null
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
    const selectedServiceName =
      services.value.find((service) => service.id === selectedService.value)?.name || ''
    const selectedFreeTime = freeTime.value.find((time) => time.id === selectedTime.value) || {}

    await axios.post('https://0052e5635286382d.mokky.dev/records', {
      user_id: userId.value,
      user_name: userName.value,
      user_number: userNumber.value,
      services_id: [selectedService.value],
      serviceNames: [selectedServiceName],
      freeTime: selectedFreeTime,
      awaits: true,
      accepted: false,
      done: false
    })

    await axios.delete(`https://0052e5635286382d.mokky.dev/freetime/${selectedTime.value}`)

    message.value = 'Запись успешно создана, вы можете отслеживать свои записи в личном кабинете.'
    formSubmitted.value = true
  } catch (error) {
    message.value = 'Произошла ошибка при записи. Пожалуйста, попробуйте еще раз.'
  }
}
</script>

<style scoped>
.free-time-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

.time-select {
  width: 100%;
  padding: 5px;
  font-size: 1.2em;
}

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
.note {
  text-decoration: none;
  color: rgba(158, 125, 93, 1);
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
.service-radio {
  margin: 10px;
  transform: scale(1.5);
}
</style>
