<template>
  <div class="authorization-form">
    <div v-if="token">
      <h2>Вы успешно зарегистрированны</h2>
    </div>
    <form v-else class="authorization-form__border" @submit.prevent="register">
      <h2 class="authorization-form__title">Регистрация</h2>
      <div class="authorization-form__block">
        <input
          id="fullName"
          name="fullName"
          v-model="fullName"
          type="text"
          placeholder="Ваше имя"
          class="authorization-form__input"
        />
        <div v-if="fullNameError" class="error">{{ fullNameError }}</div>
        <input
          id="phoneNumber"
          name="phoneNumber"
          v-model="phoneNumber"
          type="tel"
          placeholder="Номер телефона"
          class="authorization-form__input"
        />
        <div v-if="phoneNumberError" class="error">{{ phoneNumberError }}</div>
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          placeholder="Email"
          class="authorization-form__input"
        />
        <div v-if="emailError" class="error">{{ emailError }}</div>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          class="authorization-form__input"
        />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>
        <input
          id="confirmPassword"
          name="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          class="authorization-form__input"
        />
        <div v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</div>
        <button class="authorization-form__button">Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router'

const state = reactive({
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 1,
  id: '',
  token: ''
})

const fullNameError = ref('')
const phoneNumberError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const serverError = ref('')
const router = useRouter()

const validateForm = () => {
  let isValid = true

  if (!state.fullName || /\d/.test(state.fullName)) {
    fullNameError.value = 'Имя не может быть пустым или содержать цифры'
    isValid = false
  } else {
    fullNameError.value = ''
  }

  if (!state.phoneNumber || !/^\d{11}$/.test(state.phoneNumber)) {
    phoneNumberError.value = 'Номер телефона должен содержать 11 цифр'
    isValid = false
  } else {
    phoneNumberError.value = ''
  }

  if (!state.email || !/\S+@\S+\.\S+/.test(state.email)) {
    emailError.value = 'Введите корректный email'
    isValid = false
  } else {
    emailError.value = ''
  }

  if (!state.password || state.password.length < 8) {
    passwordError.value = 'Пароль не может содержать меньше 8 символов'
    isValid = false
  } else {
    passwordError.value = ''
  }

  if (state.password !== state.confirmPassword) {
    confirmPasswordError.value = 'Пароли не совпадают'
    isValid = false
  } else {
    confirmPasswordError.value = ''
  }

  return isValid
}

const register = async () => {
  if (!validateForm()) {
    return
  }

  try {
    const response = await fetch('https://0052e5635286382d.mokky.dev/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: state.fullName,
        phoneNumber: state.phoneNumber,
        email: state.email,
        password: state.password,
        role: state.role
      })
    })

    if (!response.ok) {
      const data = await response.json()
      if (response.status === 401) {
        serverError.value = 'Неверные учетные данные'
      } else if (data.error === 'User already exists') {
        serverError.value = 'Пользователь уже существует'
      } else {
        const message = `HTTP error! status: ${response.status}`
        throw new Error(message)
      }
      return
    }

    const data = await response.json()
    state.id = data.data.id
    state.token = data.token
    localStorage.setItem('token', state.token)
    serverError.value = ''
    router.push({ name: 'lk' })
  } catch (error) {
    console.error(error)
  }
}

const { fullName, phoneNumber, email, password, confirmPassword, token } = toRefs(state)
</script>

<style scoped>
.authorization-form__border {
  box-shadow: 0 20px 40px 0 #2a444b21;
  width: 479px;
  height: 505px;
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
</style>
