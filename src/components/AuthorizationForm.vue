<template>
  <div class="authorization-form">
    <div v-if="token">
      <h2>Вы успешно авторизованны</h2>
    </div>
    <form v-else class="authorization-form__border" @submit.prevent="authorize">
      <h2 class="authorization-form__title">Авторизация</h2>
      <div class="authorization-form__block">
      <input id="email" name="email" v-model="email" type="email" placeholder="Введите email" class="authorization-form__input" autocomplete="email" />
      <input id="password" name="password" v-model="password" type="password" placeholder="Введите пароль" class="authorization-form__input" autocomplete="current-password" />
      <button class="authorization-form__button" :class="{ 'button-active': !fieldsEmpty }" :disabled="fieldsEmpty">Авторизироваться</button>
    </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const email = ref(localStorage.getItem('email') || ''); 
const password = ref('');
const token = ref(localStorage.getItem('token') || null);
const fieldsEmpty = computed(() => email.value === '' || password.value === '');

const authorize = async () => {
  try {
    const response = await fetch("https://0052e5635286382d.mokky.dev/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value, 
        password: password.value
      })
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('fullName', data.data.fullName);
    localStorage.setItem('phoneNumber', data.data.phoneNumber); 
    localStorage.setItem('user_id', data.data.id);
    localStorage.setItem('email', data.data.email); 
    
    location.reload(); 
    token.value = data.token;
  } catch (error) {
    console.error(error);
  }
};
</script>



<style lang="scss">
.authorization-form {
  display: flex;
  align-items: center;
  justify-content: center;
  &__border {
    box-shadow: 0 20px 40px 0 #2a444b21;
    width: 479px;
    height: 467px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  &__title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: #636363;
    font-size: 20px;
  }
  &__block {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  &__input {
    border: 2px solid #9e7d5d;
    width: 395px;
    height: 57px;
    padding: 10px;
  }
  &__button {
    background: #525252;
    font-size: 20px;
    color: rgb(255, 255, 255);
    border: none;
    width: 230px;
    height: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    &.button-active {
      background: #9e7d5d;
    }
  }
}
</style>
