<template>
  <div class="logout">
    <form v-if="!token">
      <p>Вы успешно вышли из аккаунта</p>
    </form>
    <form v-else>
      <p>Вы хотите выйти из аккаунта?</p>
      <div class="button-container">
        <button class="yes-button" @click="logout">Да</button>
        <button class="no-button" @click="redirectToHome">Нет</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const token = ref(localStorage.getItem('token'))
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  token.value = null
  router.push({ name: 'main' })
}

const redirectToHome = () => {
  router.push({ name: 'main' })
}

onMounted(() => {
  if (!token.value) {
    localStorage.clear()
  }
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.yes-button {
  background-color: #7c8b7c;
}

.no-button {
  background-color: rgb(151, 107, 107);
}

h2 {
  text-align: center;
}

.logout {
  height: 276px;
  display: flex;
  align-items: center;
}
</style>
