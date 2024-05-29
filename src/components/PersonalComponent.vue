<template>
  <div class="PersonalComponent">
    <div class="Users__cart">
      <div class="Users__info">
        <input type="text" placeholder="name" v-model="username" />
        <input type="text" placeholder="number" v-model="number" />
        <input type="email" placeholder="email" v-model="email" />
        <button id="Users__edit__btn" @click="updateUser">Изменить</button>
      </div>
    </div>
    <div class="User__records">
      <h2 class="My__records">Мои записи</h2>
      <div class="records-grid">
        <div v-for="record in records" :key="record.id" class="record-item">
        <div class="record-card">
          <p>Услуги: {{ record.serviceNames.join(', ') }}</p>
          <p>Статус: {{ getStatus(record) }}</p>
          <p>Дата записи: {{ record.date }} {{ record.time }}</p>
          <p>Итоговая стоимость: {{ record.totalCost }}</p>
          <button @click="cancelRecord(record.id)">Отменить запись</button>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const records = ref([])

const username = ref(localStorage.getItem('fullName') || '')
const number = ref(localStorage.getItem('phoneNumber') || '') 
const user_id = localStorage.getItem('user_id')
const email = ref(localStorage.getItem('email') || '')

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://0052e5635286382d.mokky.dev/records?user_id=${user_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    records.value = response.data
  } catch (error) {
    console.error(error)
  }
})

const getStatus = (record) => {
  if (record.done) {
    return 'Завершено'
  } else if (record.accepted) {
    return 'Принято'
  } else if (record.awaits) {
    return 'Ожидает'
  } else {
    return 'Неизвестно'
  }
}

const updateUser = async () => {
  try {
    const response = await axios.patch(
      `https://0052e5635286382d.mokky.dev/users/${user_id}`,
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

    console.log(response.data)

    localStorage.setItem('fullName', username.value)
    localStorage.setItem('phoneNumber', number.value) 
    localStorage.setItem('email', email.value)
  } catch (error) {
    console.error(error)
  }
}

const cancelRecord = async (recordId) => {
  try {
    await axios.delete(`https://0052e5635286382d.mokky.dev/records/${recordId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    records.value = records.value.filter((record) => record.id !== recordId)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.PersonalComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.User__records {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.Users__cart {
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 2px 4px rgba(100, 100, 100, 0.644);
  padding: 10px;
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
  background-color:rgba(99, 99, 99, 1);
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
}
.records-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.record-item {
  flex: 0 0 calc(50% - 10px); 
  margin-bottom: 20px;
}
</style>
