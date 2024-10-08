<template>
  <div class="authorization-form">
    <div v-if="token">
      <h2>Вы успешно авторизованны</h2>
    </div>
    <form v-else class="authorization-form__border" @submit.prevent="authorize">
      <h2 class="authorization-form__title">Авторизация</h2>
      <div class="authorization-form__block">
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          placeholder="Введите email"
          class="authorization-form__input"
          autocomplete="email"
        />
        <div v-if="emailError" class="error">{{ emailError }}</div>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          class="authorization-form__input"
          autocomplete="current-password"
        />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
        <div v-if="serverError" class="error">{{ serverError }}</div>
        <button
          class="authorization-form__button"
          :class="{ 'button-active': !fieldsEmpty }"
          :disabled="fieldsEmpty"
        >
          Авторизироваться
        </button>
      </div>
      <p>
        Еще нет аккаунта?
        <router-link class="note" to="/registration">Зарегистрируйтесь</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const email = ref(localStorage.getItem('email') || '')
const password = ref('')
const token = ref(localStorage.getItem('token') || null)
const fieldsEmpty = computed(() => email.value === '' || password.value === '')
const emailError = ref('')
const passwordError = ref('')
const serverError = ref('')
const router = useRouter()

const validateForm = () => {
  let isValid = true

  if (!email.value) {
    emailError.value = 'Email не может быть пустым'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Введите корректный email'
    isValid = false
  } else {
    emailError.value = ''
  }

  if (!password.value) {
    passwordError.value = 'Пароль не может быть пустым'
    isValid = false
  } else if (password.value.length < 8) {
    passwordError.value = 'Пароль должен содержать не менее 8 символов'
    isValid = false
  } else {
    passwordError.value = ''
  }

  return isValid
}

const authorize = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const response = await fetch('https://0052e5635286382d.mokky.dev/auth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (!response.ok) {
      const data = await response.json()
      if (response.status === 401) {
        serverError.value = 'Неверные учетные данные'
      } else if (data.error === 'User does not exist') {
        serverError.value = 'Такого пользователя не существует'
      } else {
        const message = `An error has occured: ${response.status}`
        throw new Error(message)
      }
      return
    }

    const data = await response.json()
    localStorage.setItem('token', data.token)
    token.value = data.token
    serverError.value = ''
    router.push({ name: 'lk' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.authorization-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.authorization-form__border {
  box-shadow: 0 20px 40px 0 #2a444b21;
  width: 479px;
  height: 467px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.authorization-form__title {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: #636363;
  font-size: 20px;
}

.authorization-form__block {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.authorization-form__input {
  border: 2px solid #9e7d5d;
  width: 395px;
  height: 57px;
  padding: 10px;
}

.authorization-form__button {
  background: #525252;
  font-size: 20px;
  color: rgb(255, 255, 255);
  border: none;
  width: 230px;
  height: 50px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.authorization-form__button.button-active {
  background: #9e7d5d;
}

.note {
  text-decoration: none;
  color: rgba(158, 125, 93, 1);
}
</style>
