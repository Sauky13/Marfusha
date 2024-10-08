<template>
  <p v-if="!isUserLoggedIn">
    <router-link class="note" to="/registration">Зарегистрируйтесь</router-link> или
    <router-link class="note" to="/auth">Войдите</router-link> для просмотра личного кабинета
  </p>
  <div v-else class="PersonalComponent">
    <div class="Users__cart">
      <div class="Users__info">
        <input
          id="username"
          name="username"
          type="text"
          placeholder="name"
          v-model="username"
          autocomplete="name"
        />
        <input
          id="number"
          name="number"
          type="text"
          placeholder="number"
          v-model="number"
          autocomplete="tel"
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email"
          v-model="email"
          autocomplete="email"
        />
        <button id="Users__edit__btn" @click="updateUser">Изменить</button>
      </div>
    </div>
    <div v-if="role === 1">
      <h2 class="My__records" v-if="records.length">Мои записи</h2>
      <h2 class="My__records" v-else>У вас пока что нет записей</h2>
      <div class="User__records">
        <div class="records-grid">
          <div v-for="record in records" :key="record.id" class="record-item">
            <div class="record-card">
              <p>Услуги: {{ record.serviceNames.join(', ') }}</p>
              <p>Дата и время записи: {{ record.freeTime.date }} {{ record.freeTime.time }}</p>
              <p>Итоговая стоимость: {{ record.totalCost }}</p>
              <p v-if="record.status === 'cancelled'">Статус: Отменено</p>
              <p v-else>
                Статус:
                <span v-if="record.awaits">Ожидает подтверждения</span>
                <span v-else-if="record.accepted">Подтверждено</span>
                <span v-else-if="record.done">Выполнено</span>
                <span v-else>Неизвестный статус</span>
              </p>
              <p v-if="record.status === 'cancelled'">Комментарий: {{ record.comment }}</p>
              <button
                v-if="!record.accepted && !record.done && record.status !== 'cancelled'"
                @click="cancelRecord(record)"
              >
                Отменить запись
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="role === 2" class="admin__panel">
      <button @click="openModal" class="admin__btn">Добавить время и дату для записей</button>
      <button @click="viewAllRecords" class="admin__btn">Просмотреть все записи</button>
    </div>
    <div v-if="isAllRecordsModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closeAllRecordsModal" class="close">&times;</span>
        <div v-for="record in allRecords" :key="record.id" class="record-item">
          <div class="card">
            <p>Пользователь: {{ record.user_name }}</p>
            <p>Номер телефона: {{ record.user_number }}</p>
            <p>Услуги: {{ record.serviceNames.join(', ') }}</p>
            <p>Общая стоимость: {{ record.totalCost }}</p>
            <p>Время: {{ record.freeTime.time }}</p>
            <p>Дата: {{ record.freeTime.date }}</p>
            <div class="update__status">
              <label>
                <input
                  type="checkbox"
                  v-model="record.awaits"
                  @change="updateRecordStatus(record.id, 'awaits', record.awaits)"
                />
                Ожидает подтверждения
              </label>
              <label>
                <input
                  type="checkbox"
                  v-model="record.accepted"
                  @change="updateRecordStatus(record.id, 'accepted', record.accepted)"
                />
                Подтверждено
              </label>
              <label>
                <input
                  type="checkbox"
                  v-model="record.done"
                  @change="updateRecordStatus(record.id, 'done', record.done)"
                />
                Выполнено
              </label>
              <button v-if="!record.done" @click="openCancelModal(record)">Отменить запись</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isCancelModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closeCancelModal" class="close">&times;</span>
        <form @submit.prevent="submitCancelRecord">
          <p>Укажите причину отмены записи:</p>
          <textarea v-model="cancelComment" required></textarea>
          <button type="submit">Отменить запись</button>
        </form>
      </div>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <form @submit.prevent="addTimeAndDate">
          <label for="time">Время:</label>
          <input id="time" type="time" v-model="time" required />
          <label for="date">Дата:</label>
          <input id="date" type="date" v-model="date" required />
          <label for="service">Услуга:</label>
          <select id="service" v-model="service" required>
            <option disabled value="">Выберите услугу</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <button type="submit">Добавить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const records = ref([])
const isModalOpen = ref(false)
const username = ref('')
const number = ref('')
const user_id = ref('')
const email = ref('')
const role = ref('')
const services = ref([])
const time = ref('')
const date = ref('')
const service = ref('')
const allRecords = ref([])
const isAllRecordsModalOpen = ref(false)
const isCancelModalOpen = ref(false)
const cancelComment = ref('')
const recordToCancel = ref(null)

onMounted(async () => {
  await getUserData()
  await getRecords()
  await getServices()
})

const isUserLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null
})

async function getUserData() {
  try {
    const response = await axios.get(`https://0052e5635286382d.mokky.dev/auth_me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    username.value = response.data.fullName
    number.value = response.data.phoneNumber
    email.value = response.data.email
    role.value = response.data.role
    user_id.value = response.data.id
  } catch (error) {
    console.error(error)
  }
}

async function getRecords() {
  try {
    const userId = user_id.value
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `https://0052e5635286382d.mokky.dev/records?user_id=${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    records.value = response.data
  } catch (error) {
    console.error(error)
  }
}

async function getServices() {
  try {
    const response = await axios.get('https://0052e5635286382d.mokky.dev/services')
    services.value = response.data
  } catch (error) {
    console.error(error)
  }
}

async function updateUser() {
  try {
    const userId = user_id.value
    const response = await axios.patch(
      `https://0052e5635286382d.mokky.dev/users/${userId}`,
      {
        fullName: username.value,
        phoneNumber: number.value,
        email: email.value
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    response.data
  } catch (error) {
    console.error(error)
  }
}

async function cancelRecord(record) {
  try {
    const { freeTime } = record

    await axios.delete(`https://0052e5635286382d.mokky.dev/records/${record.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    records.value = records.value.filter((r) => r.id !== record.id)

    await axios.post(
      'https://0052e5635286382d.mokky.dev/freetime',
      {
        time: freeTime.time,
        date: freeTime.date,
        service_id: freeTime.service_id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
}

async function updateRecordStatus(recordId, status, isChecked) {
  try {
    let updateData = {}
    if (status === 'awaits') {
      updateData = { awaits: isChecked, accepted: false, done: false }
    } else if (status === 'accepted') {
      updateData = { accepted: isChecked, awaits: !isChecked, done: false }
    } else if (status === 'done') {
      updateData = { done: isChecked, accepted: false, awaits: false }
    }

    const response = await axios.patch(
      `https://0052e5635286382d.mokky.dev/records/${recordId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    response.data
    await getAllRecords()
  } catch (error) {
    console.error(error)
  }
}

async function getAllRecords() {
  try {
    const response = await axios.get('https://0052e5635286382d.mokky.dev/records', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    allRecords.value = response.data.sort((a, b) => {
      const dateTimeA = new Date(`${a.freeTime.date}T${a.freeTime.time}`)
      const dateTimeB = new Date(`${b.freeTime.date}T${b.freeTime.time}`)
      return dateTimeA - dateTimeB
    })
  } catch (error) {
    console.error(error)
  }
}

async function addTimeAndDate() {
  try {
    const response = await axios.post(
      'https://0052e5635286382d.mokky.dev/freetime',
      {
        time: time.value,
        date: date.value,
        service_id: service.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    response.data
    closeModal()
  } catch (error) {
    console.error(error)
  }
}

async function submitCancelRecord() {
  if (!recordToCancel.value) return

  try {
    await axios.patch(
      `https://0052e5635286382d.mokky.dev/records/${recordToCancel.value.id}`,
      {
        comment: cancelComment.value,
        status: 'cancelled'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    allRecords.value = allRecords.value.filter((r) => r.id !== recordToCancel.value.id)
    closeCancelModal()
  } catch (error) {
    console.error(error)
    if (error.response && error.response.status === 404) {
      console.error('Endpoint not found: ', error.response.config.url)
    }
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const viewAllRecords = () => {
  getAllRecords()
  isAllRecordsModalOpen.value = true
}

const closeAllRecordsModal = () => {
  isAllRecordsModalOpen.value = false
}

const openCancelModal = (record) => {
  recordToCancel.value = record
  cancelComment.value = ''
  isCancelModalOpen.value = true
}

const closeCancelModal = () => {
  recordToCancel.value = null
  isCancelModalOpen.value = false
}
</script>

<style scoped>
.update__status {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.card {
  border: 1px solid rgba(158, 125, 93, 1);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  width: 36%;
  height: auto;
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form input,
form select,
form button {
  padding: 10px;
  font-size: 16px;
}

form button {
  background-color: #424242;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

form button:hover {
  background-color: #000000;
}

.PersonalComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 30px;
}

.admin__btn {
  background-color: rgba(99, 99, 99, 1);
  color: rgb(255, 255, 255);
  border: none;
  height: 50px;
  width: 195px;
  cursor: pointer;
}

.admin__panel {
  display: flex;
  gap: 10px;
}

.User__records {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
}

.Users__cart {
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.644);
  padding: 10px;
  margin-top: 20px;
  width: 400px;
  height: 200px;
  justify-content: center;
}

.Users__info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.note {
  text-decoration: none;
  color: rgba(158, 125, 93, 1);
}

.record-card {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}

.record-card button {
  background-color: rgba(99, 99, 99, 1);
  color: rgb(255, 255, 255);
  border: none;
  height: 35px;
  width: 180px;
  cursor: pointer;
}

.Users__info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

input {
  border-bottom: 1px solid rgba(99, 99, 99, 1);
  border-top: none;
  border-left: none;
  border-right: none;
  color: rgba(158, 125, 93, 1);
  font-size: 20px;
}

#Users__edit__btn {
  background-color: transparent;
  color: rgba(158, 125, 93, 1);
  border: none;
  height: 35px;
  width: 200px;
  border: 1px solid rgba(158, 125, 93, 1);
  cursor: pointer;
}

.My__records {
  color: rgba(158, 125, 93, 1);
  font-family: 'Roboto', sans-serif;
  text-align: center;
}

.records-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.record-item {
  flex: 0 0 calc(50% - 10px);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
